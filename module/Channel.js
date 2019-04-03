const mongoose = require("mongoose");
var config = require('../config/config');

module.exports = {
    createChannel: function (oChannelContext) {
        mongoose.connect(config.mongoose.uri,{
            useNewUrlParser: true,
        });

        let channelScheme = require('../Model/models').channelScheme;
        let Channel = mongoose.model("channels", channelScheme);
        let channel = new Channel({
            name: oChannelContext.name,
            creator: oChannelContext.creator,
            participants: [oChannelContext.creator],
            messages: []
        });

        channel.save(function (err) {
            if(!err){
                console.log("Встреча добавлена");
            }
            else throw err;
        });
    },
    getMeets: async function () {
        mongoose.connect(config.mongoose.uri,{
            useNewUrlParser: true,
        });

        let channelScheme = require('../Model/models').channelScheme;
        let Channel = mongoose.model("channels", channelScheme);

        try{
            var channels = await Channel.find({}).exec();
            return channels;
        } catch (e) {
            return e;
        }
    },
    getParticipantFlag: async function(oParams){
        var sUserLogin = oParams.userLogin;
        var sId = oParams._id;

        mongoose.connect(config.mongoose.uri,{
            useNewUrlParser: true,
        });
        let channelScheme = require('../Model/models').channelScheme;
        let Channel = mongoose.model("channels", channelScheme);

        var ObjectId = mongoose.Types.ObjectId;
        var queryId = ObjectId(sId);

        try{
            var channel = await Channel.findById(queryId).exec();
            if(channel.participants.indexOf(sUserLogin) !== -1){
                return true;
            }
            return false;
        } catch (e) {
            throw e;
        }
    },
    getSingleChannel: async function(channelId){
        mongoose.connect(config.mongoose.uri,{
            useNewUrlParser: true,
        });
        let channelScheme = require('../Model/models').channelScheme;
        let Channel = mongoose.model("channels", channelScheme);

        var ObjectId = mongoose.Types.ObjectId;
        var queryId = ObjectId(channelId);

        try{
            let channel  = await Channel.findById(queryId).exec();
            return channel;
        } catch (e) {
            throw e;
        }
    },
    writeMessage: async function (oChannelContext) {
        mongoose.connect(config.mongoose.uri,{
            useNewUrlParser: true,
        });
        if(oChannelContext.messageText !== ""){
            var singleChannel = await this.getSingleChannel(oChannelContext.meetId);
            singleChannel.messages.push({
                author: oChannelContext.author,
                text: oChannelContext.messageText
            });
            singleChannel.save();
        }
    },
    joinToTheChannel: async function (oChannelContext) {
        mongoose.connect(config.mongoose.uri,{
            useNewUrlParser: true,
        });
        var singleChannel = await this.getSingleChannel(oChannelContext.channelId);
        singleChannel.participants.push(oChannelContext.userLogin);
        singleChannel.save();
    },
    getChannelsByUser: async function(userLogin){
        mongoose.connect(config.mongoose.uri,{
            useNewUrlParser: true,
        });

        let channelScheme = require('../Model/models').channelScheme;
        let Channel = mongoose.model("channels", channelScheme);

        try{
            var channels = await Channel.find({participants: userLogin}).exec();
            return channels;
        } catch (e) {
            return e;
        }
    }
};