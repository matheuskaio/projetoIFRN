import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import TeacherController from './app/controllers/TeacherController';
import SessionController from './app/controllers/SessionController';
import ProjectController from './app/controllers/ProjectController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.post('/teachers', TeacherController.store);
routes.get('/teachers', TeacherController.list);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.list);

routes.post('/projects/:student_id/:teacher_id', ProjectController.store);
routes.get('/projects/', ProjectController.list);
routes.get('/projects/:project_id', ProjectController.index);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
export default routes;
