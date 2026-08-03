import { Issue, type IssueType } from "../../../domain/entities/issue";
import type { issuesTable } from "../schema/issue.schema";

type IssueRow = typeof issuesTable.$inferSelect;

export class IssueMapper {
    static toDomain(row: IssueRow): Issue {
        return Issue.fromPersistence(
            row.id,
            row.type as IssueType,
            row.platform,
            row.message,
            row.email,
            row.createdAt!,
            row.updatedAt!
        );
    }

    static toPersistence(issue: Issue) {
        return {
            type: issue.type,
            platform: issue.platform,
            message: issue.message,
            email: issue.email,
        };
    }
}
