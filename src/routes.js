import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import UserLogadoSystemController from './app/controllers/UserLogadoSystemController';
import StudentController from './app/controllers/StudentController';
import TeacherController from './app/controllers/TeacherController';
import SessionController from './app/controllers/SessionController';
import ProjectController from './app/controllers/ProjectController';
import ProjectTypeController from './app/controllers/ProjectTypeController';
import ProjectUserController from './app/controllers/ProjectUserController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// ROTAS DE CRIAÇÃO DE SESSÃO
routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.index);
routes.post('/users', UserController.store);

// ROTAS DE CRIAÇÃO E LISTAGEM DE PROFESSORES
routes.post('/teachers', TeacherController.store);
routes.get('/teachers', TeacherController.list);

// ROTAS DE CRIAÇÃO DE ALUNO E LISTAGEM DE ALUNOS
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.list);

// ROTAS DE LISTAGEM DE PROJETO E DETALHE DE PROJETO
routes.get('/projects/', ProjectController.list);
routes.get('/projects-search/:search', ProjectController.search);
routes.get('/projects/:project_id', ProjectController.index);
routes.get('/projects-type/:type', ProjectTypeController.list);

routes.use(authMiddleware);

// EDITAR ALUNO
routes.put('/students/:user_id', StudentController.update);

routes.post('/projects/:student_id/:teacher_id', ProjectController.store);
routes.get('/projectsUser/:tipo', ProjectUserController.list);
routes.get('/projectsUser/', ProjectUserController.list1);

routes.get('/user-logado', UserLogadoSystemController.index);
routes.put('/users', UserController.update);
// Detalhe do usuário logado
routes.get('/students/detail', StudentController.index);
routes.post('/files', upload.single('file'), FileController.store);
export default routes;
