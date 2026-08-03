import { describe, expect, it } from "bun:test";
import { CreateIssueUseCase } from "../../../application/use-cases/create-issue.use-case";
import { Issue } from "../../../domain/entities/issue";
import type { IIssueRepository } from "../../../domain/repositories/issue-repository.interface";

class MockIssueRepository implements IIssueRepository {
    public savedIssues: Issue[] = [];

    async save(issue: Issue): Promise<Issue> {
        const saved = Issue.fromPersistence(
            "123e4567-e89b-12d3-a456-426614174000", // simulated uuid
            issue.type,
            issue.platform,
            issue.message,
            issue.email,
            new Date(),
            new Date()
        );
        this.savedIssues.push(saved);
        return saved;
    }
}

describe("CreateIssueUseCase", () => {
    it("should coordinate saving an issue through the repository and returning the mapped response", async () => {
        const repo = new MockIssueRepository();
        const useCase = new CreateIssueUseCase(repo);

        const payload = {
            type: "issues",
            platform: "Android App",
            message: "Bluetooth disconnects frequently",
            email: "user@example.com"
        };

        const result = await useCase.execute(payload);

        expect(repo.savedIssues.length).toBe(1);
        const savedIssue = repo.savedIssues[0]!;
        expect(savedIssue.type).toBe("issues");
        expect(savedIssue.platform).toBe("Android App");
        expect(savedIssue.message).toBe("Bluetooth disconnects frequently");
        expect(savedIssue.email).toBe("user@example.com");

        expect(result.id).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(result.type).toBe("issues");
        expect(result.platform).toBe("Android App");
        expect(result.message).toBe("Bluetooth disconnects frequently");
        expect(result.email).toBe("user@example.com");
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    });
});
