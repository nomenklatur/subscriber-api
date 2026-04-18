import type { Request, Response } from "express";
import { z } from "zod";
import type { SubscriberUserUseCase } from "../../../application/use-cases/subscribe-user.use-case";
import { subscribeRequest } from "../requests/subscriber/subscriber.request";

export class SubscriberController {
    constructor(private readonly subscribeUserUseCase: SubscriberUserUseCase) { }

    subscribe = async (req: Request, res: Response) => {
        try {
            const validatedPayload = subscribeRequest.parse(req.body);
            const result = await this.subscribeUserUseCase.execute(validatedPayload);
            return res.status(201).json(result);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: 'Validation failed', details: error.message });
            }
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}