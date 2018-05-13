import './raf.js';
import './cannyEdge.js';
import { FileManager } from './fileManager';
import { CanvasController } from './canvasController';
import { canvasDrawer } from './shapeDrawer';
import apiService from './apiService';
import * as helpers from './helpers';
import imageRecognizer from 'app/utils/imageRecognizer';

const fileManager = new FileManager();
const canvasController = new CanvasController();
export {
  fileManager,
  canvasController,
  canvasDrawer,
  apiService,
  imageRecognizer,
  helpers
};
