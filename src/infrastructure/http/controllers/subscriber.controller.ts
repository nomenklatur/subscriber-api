import type { Request, Response } from "express";
import type { SubscriberUserUseCase } from "../../../application/use-cases/subscribe-user.use-case";
import { subscribeRequest } from "../requests/subscriber/subscriber.request";

export class SubscriberController {
    constructor(private readonly subscribeUserUseCase: SubscriberUserUseCase) { }

    async subscribe(req: Request, res: Response) {
        const validatedPayload = subscribeRequest.parse(req.body);
        try {
            const result = await this.subscribeUserUseCase.execute(validatedPayload);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}