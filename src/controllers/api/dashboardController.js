const Blog = require('../../models/blog');
const Project = require('../../models/project');
const Query = require('../../models/query');
const Subscriber = require('../../models/subscriber');
const Comment = require('../../models/comment');
const Log = require('../../models/log');

const get_index = async (req, res) => {
    const blogs = await Blog.count();
    const comments = await Comment.count();
    const subscribers = await Subscriber.count();
    const projects = await Project.count();
    const queries = await Query.count();
    Log.find().sort({ createdAt: -1 })
        .then(result => {
            res.status(200).send({ status: "success", message: "The operation was successful", data: {logs: result, blogs, comments, subscribers, queries, projects}})
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ status: "fail", message: "The operations was not successful"});
        });
};

module.exports = {
    get_index
}