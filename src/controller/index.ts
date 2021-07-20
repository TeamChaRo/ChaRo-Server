import writePostController from './writePostController';
import postDetailController from './postDetailController';
import mainController from './mainController';
import { newPreviewController, likePreviewController } from './previewController';
import { saveHistoryController, loadHistoryController } from './historyController';
import { likePostController, savePostController } from './postController';
import { likeMyPageController, newMyPageController } from './myPageController';
import modifyPostController from './modifyPostController';
import { authorizeUrl, googleLoginController } from '../controller/googleController';

export {
  writePostController,
  likePreviewController,
  newPreviewController,
  postDetailController,
  saveHistoryController,
  loadHistoryController,
  mainController,
  likePostController,
  savePostController,
  likeMyPageController,
  newMyPageController,
  modifyPostController,
  authorizeUrl,
  googleLoginController,
};
