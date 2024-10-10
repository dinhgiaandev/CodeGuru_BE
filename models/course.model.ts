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
    estimatedPrice?: number,
    thumbnail: object,
    tags: string,
    level: string,
    demoUrl: string,
    benefits: { title: string[] },
    prerequisites: { title: string[] },
    reviews: IReview[],
    courseData: ICourseData[],
    rating?: number,
    purchased?: number,
}