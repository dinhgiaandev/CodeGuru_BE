import mongoose, { Model, Schema, Document } from "mongoose";

interface IComment extends Document {
    user: object,
    comment: string,
    commentReply: IComment[],
}

interface IReview extends Document {
    user: object,
    rating: number,
    comment: string,
    commentReply: IComment[],
}

interface ILink extends Document {
    title: string,
    url: string,
}

interface ICourseData extends Document {
    title: string,
    description: string,
    videoUrl: string,
    videoThumbnail: object,
    videoSection: string,
    videoLength: number,
    videoPlayer: string,
    link: ILink[],
    suggestion: string,
    questions: IComment[],
}

interface ICourse extends Document {
    name: string,
    description: string,
    price: number,
    suggestedPrice?: number,
    thumbnail: object,
    tags: string,
    level: string,
    demoUrl: string,
    benefits: { title: string[] },
    requirements: { title: string[] },
    reviews: IReview[],
    courseData: ICourseData[],
    rating?: number,
    purchased?: number,
}

const reviewSchema = new Schema<IReview>({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
});

const linkSchema = new Schema<ILink>({
    title: String,
    url: String,
});

const commentSchema = new Schema<IComment>({
    user: Object,
    comment: String,
    commentReply: [Object],
});

const courseDataSchema = new Schema<ICourseData>({
    videoUrl: String,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    link: [linkSchema],
    suggestion: String,
    questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    suggestedPrice: {
        type: Number,
    },

    thumbnail: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
            default: ""
        },
    },

    tags: {
        type: String,
        required: true,
    },

    level: {
        type: String,
        required: true,
    },

    demoUrl: {
        type: String,
        required: false,
    },

    benefits: [{ title: String }],
    requirements: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    rating: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0,
    },
});

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;