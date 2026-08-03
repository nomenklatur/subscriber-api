import type { Request, Response } from "express";
import { z } from "zod";
import type { CreateIssueUseCase } from "../../../application/use-cases/create-issue.use-case";
import { createIssueRequest } from "../requests/issue/create-issue.request";

export class IssueController {
    constructor(private readonly createIssueUseCase: CreateIssueUseCase) { }

    create = async (req: Request, res: Response) => {
        try {
            const validatedPayload = createIssueRequest.parse(req.body);
            const result = await this.createIssueUseCase.execute(validatedPayload);
            return res.status(201).json(result);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: 'Validation failed', details: error.message });
            }
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}
