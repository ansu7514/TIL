import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
    title: String,
    body: String,
    tage: [String], // 문자열로 이루어진 배열
    publishedDate: {
        type: Date,
        defaut: Date.now,   // 현재 날짜를 기본값으로 지정
    },
});

const Post = mongoose.model('Post', PostSchema);
export default Post;