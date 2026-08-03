import { Issue } from "../../domain/entities/issue";
import type { IIssueRepository } from "../../domain/repositories/issue-repository.interface";

export interface CreateIssuePayload {
    type: string;
    platform: string;
    message: string;
    email: string;
}

export interface CreateIssueResponse {
    id: string;
    type: string;
    platform: string;
    message: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateIssueUseCase {
    constructor(
        private readonly issueRepository: IIssueRepository
    ) { }

    async execute(payload: CreateIssuePayload): Promise<CreateIssueResponse> {
        const newIssue = Issue.create(
            payload.type,
            payload.platform,
            payload.message,
            payload.email
        );

        const savedIssue = await this.issueRepository.save(newIssue);

        return {
            id: savedIssue.id!,
            type: savedIssue.type,
            platform: savedIssue.platform,
            message: savedIssue.message,
            email: savedIssue.email,
            createdAt: savedIssue.createdAt!,
            updatedAt: savedIssue.updatedAt!
        };
    }
}
