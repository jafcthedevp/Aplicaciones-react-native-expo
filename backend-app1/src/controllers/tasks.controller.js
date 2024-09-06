export const getTasks = async (req, res) => {
     res.send('hello getstasks')
}

export const getTask = async (req, res) => {
    console.log(req.params.id)
    res.send('hi')
}

export const getTaskCount = async (req, res) => {
    res.send('helloworld')
}

export const saveTask = async (req, res) => {
    res.send('helloworld')
}

export const deleteTasks = async (req, res) => {
    res.send('helloworld')
}

export const updateTasks = async (req, res) => {
    res.send('helloworld')
}

