const discussionModel = require('../models/discussions.model');

class DiscussionService {

    static async createNewDiscussion(title, author, content) {
        try{
            const dicussionObj = new discussionModel({ title, author, content });
            const response = await dicussionObj.save();
            return response;
        }catch(error){
            throw error;
        }
    }

}

module.exports = DiscussionService;