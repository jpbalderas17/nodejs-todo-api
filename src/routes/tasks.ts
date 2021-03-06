import { db } from '../db';
import { Router } from 'express';

interface Task {
    id: Number;
    title: string;
    description: string;
    created_at?: string;
    completed_at?: string;
}

interface TaskInput {
    title: string;
    description: string;
}

export class Tasks {
    router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    setRoutes() {
        // Retrieve tasks
        this.router.get('/', (req, res) => {
            this.getTasks(<string>req.query?.filter)
                .then(([rows]) => res.send(rows));
        });

        // Create new task
        this.router.post('/', (req, res) => {
            //TODO: Validate Input
            const formData: TaskInput = {
                title: req.body.title,
                description: req.body.description,
            };

            this.storeTask(formData)
                .then(() => {
                    res.status(200)
                        .json({status: 'OK'});
                });;
        });

        // Update task information
        this.router.put('/:taskId', (req, res) => {
            //TODO: Validate Input
            const task: Task = {
                id: parseInt(req.params.taskId),
                title: req.body.title,
                description: req.body.description
            };

            this.updateTask(task)
                .then(() => { 
                    res.status(200)
                        .json({status: 'OK'});
                });;
        });

        // Toggle completed_at field
        this.router.post('/toggle', (req, res) => {
            this.updateTaskStatus(parseInt(req.body.id))
                .then(() => { 
                    res.status(200)
                        .json({status: 'OK'});
                });
        });

        // Delete task
        this.router.delete('/:taskId', (req, res) => {
            this.destroyTask(parseInt(req.params.taskId))
                .then(() => { 
                    res.status(200)
                        .json({status: 'OK'});
                });
        });
    }

    /**
     * get filtered tasks
     * @param filter Search string used to filter tasks titles
     */
    async getTasks(filter: string) {
        const queryString = `
            SELECT
                id,
                title,
                description,
                DATE_FORMAT(created_at, "%d/%m/%Y %k:%i:%s") as created_at,
                DATE_FORMAT(completed_at , "%d/%m/%Y %k:%i:%s") as completed_at
            from
                tasks`;
        const whereString = 'WHERE title LIKE ?'
        const sortQueryString = 'ORDER BY created_at ASC'

        // No filter string passed
        if (!filter) {
            return await db.execute(`${queryString} ${sortQueryString}`);
        }

        return await db.execute(`${queryString} ${whereString} ${sortQueryString}`, [`%${filter}%`]);
    }

    /**
     * Insert new task
     * @param taskInput Data to be saved in the task table
     */
    async storeTask(taskInput: TaskInput) {
        return await db.execute('INSERT INTO tasks(title, description) VALUES(?, ?)', [taskInput.title, taskInput.description])
    }

    /**
     * Execute db query to update title and description of task
     * @param task task object with new values
     */
    async updateTask(task: Task) {
        return await db.execute('UPDATE tasks SET title=?, description=? WHERE id=?', [task.title, task.description, task.id])
    }

    /**
     * Execute delete query
     * @param taskId id of the task to be deleted
     */
    async destroyTask(taskId: Number) {
        return await db.execute('DELETE FROM tasks WHERE id=?', [taskId]);
    }

    /**
     * Toggles the completed_at field to update status
     * @param taskId id of the task to be updated
     */
    async updateTaskStatus(taskId: Number) {
        return await db.execute('UPDATE tasks SET completed_at = IF(ISNULL(completed_at), NOW(), NULL) WHERE id=?', [taskId]);
    }
}

const taskRouting = new Tasks();

export default taskRouting.router;
