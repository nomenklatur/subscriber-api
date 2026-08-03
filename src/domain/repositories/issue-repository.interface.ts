import type { Issue } from "../entities/issue";

export interface IIssueRepository {
    save(issue: Issue): Promise<Issue>;
}
