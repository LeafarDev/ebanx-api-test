import {Response} from "express";

export const expressResponseMock = {
  json: jest.fn(),
  status: jest.fn(() => expressResponseMock)
} as unknown as Response;
