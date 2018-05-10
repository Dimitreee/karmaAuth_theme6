import './raf.js';
import { FileManager } from './fileManager';
import { CanvasController } from './canvasController';
import { canvasDrawer } from './shapeDrawer';
import * as helpers from './helpers';

const fileManager = new FileManager();
const canvasController = new CanvasController();
export { fileManager, canvasController, canvasDrawer, helpers };
