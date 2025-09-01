export type LessonLevel = "Beginner" | "Intermediate" | "Advanced";


export interface Lesson {
id: number;
title: string;
description?: string;
level: LessonLevel;
imageUrl?: string;
createdAt: string;
}