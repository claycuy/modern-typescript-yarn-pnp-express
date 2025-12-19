import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';


const watchDir = './src';
const program = 'grep';
const args = ['pattern'];
let currentProcess = null;

const watcher = fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
  if (!filename) return;

  const filePath = path.join(watchDir, filename);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    console.log(`${eventType}: ${filename}`);

    const fileStream = fs.createReadStream(filePath);
    const child = spawn(program, args);

    fileStream.pipe(child.stdin);

    // reload current process
    stopProgram(currentProcess);
    runProgram();

    child.stdout.on('data', (data) => {
      console.log(`Output: ${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
    });
  }
});

watcher.on('error', (error) => {
  console.error('Watcher error:', error);
});


const cleanup = () => {
  watcher.close();
  console.log('Stopped watching.');
}


const syncronousProgram = async (cmd, args) => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${cmd} exited with code ${code}`));
      }
    });
  });
}


const runProgram = async () => {
  console.log('[DEV] Starting development build...');
  try {
    await syncronousProgram('tsc', ['-b']);
    console.log('[DEV] TSC build successful. Starting Rollup...');

    await syncronousProgram('rollup', ['-c', '--bundleConfigAsCjs']);
    console.log('[DEV] Rollup build successful. Starting Node...');

    currentProcess = nodeProgram();
    currentProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Node process exited with code ${code}`);
      }
    });
  } catch (error) {
    console.error(`Build chain failed: ${error.message}`);
  }
}
const stopProgram = (proc) => {
  if (proc && !proc.killed) {
    proc.kill();
  }
}

// list of commands
const nodeProgram = () => {
  // clear previous lines
  process.stdout.write('\x1Bc');
  return spawn('node', ['./dist/index.js'], { stdio: 'inherit' });
}


process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

console.log(`Watching ${watchDir}...`);
runProgram();