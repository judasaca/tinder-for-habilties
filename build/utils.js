"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseComment = (commentFromRequest) => {
    if (!isString(commentFromRequest)) {
        throw new Error('Incorrect or missing comment');
    }
    return commentFromRequest;
};
const parseDate = (dateFromRequest) => {
    if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
        throw new Error('Incorrect or missing date');
    }
    return dateFromRequest;
};
const parseWeather = (weatherFromRequest) => {
    if (!isString(weatherFromRequest) || isWeather(weatherFromRequest)) {
        throw new Error("Incorrect or missing weather");
    }
    return weatherFromRequest;
};
const isWeather = (string) => {
    return ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'].includes(string);
};
const isString = (string) => {
    return typeof string === 'string';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const toNewDiaryEntry = (object) => {
    const newEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
    };
    return newEntry;
};
exports.default = ;
