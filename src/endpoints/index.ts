import { Request, Response } from 'express';

module.exports = function index(_: Request, res: Response) {
  res.status(200).json({
    success: true,
    message: 'This is a health check endpoint'
  });
}
