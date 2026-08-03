import { db } from "../connection";
import { issuesTable } from "../schema/issue.schema";
import { IssueMapper } from "../mappers/issue.mapper";
import type { IIssueRepository } from "../../../domain/repositories/issue-repository.interface";
import type { Issue } from "../../../domain/entities/issue";

export class IssueRepository implements IIssueRepository {
    async save(newIssue: Issue): Promise<Issue> {
        const rows = await db.insert(issuesTable)
            .values(IssueMapper.toPersistence(newIssue))
            .returning();

        if (rows.length === 0) {
            throw new Error("Failed to save issue");
        }

        return IssueMapper.toDomain(rows[0]!);
    }
}
