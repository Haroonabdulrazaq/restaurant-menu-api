import express, { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  // url, method, data, time

  let data = {
    url: req.originalUrl,
    method: req.method,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };
  console.log(data);
  next();
};

export default logger;
