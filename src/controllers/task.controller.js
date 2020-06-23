const repository = require('../repositories/task.repository');
const HttpStatus = require('http-status-codes');
const formatDate = require('../utils/formatDate');

exports.getTaskController = async (req, res) => {
    try{

        var tasks = await repository.getTasksRepository();
        res.status(HttpStatus.OK)
            .json({data: tasks});

    }catch(e){
        console.log(e)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ 
                code: HttpStatus.INTERNAL_SERVER_ERROR, 
                message: 'Error application...', 
                error: e,
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });
    }
};

exports.createTaskController = async (req, res, next) => {
    try{
        var newTask = await repository.createTaskRepository(req.body);
        res.status(HttpStatus.CREATED)
            .json({ 
                code: HttpStatus.CREATED, 
                message: 'Task created with success.', 
                data: newTask,
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });

    }catch(e){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ 
                code: HttpStatus.INTERNAL_SERVER_ERROR, 
                message: 'Error application.', 
                error: e,
                date: formatDate.asString('yyyy-MM-dd', new Date())
            });
    }
};
