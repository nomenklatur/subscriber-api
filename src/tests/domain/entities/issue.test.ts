import { describe, expect, it } from "bun:test";
import { Issue } from "../../../domain/entities/issue";
import { InvalidEmailError, InvalidIssueTypeError, MissingRequiredFieldError } from "../../../domain/errors/domain_error";

describe("Issue Entity", () => {
    it("should successfully create a valid issue entity", () => {
        const issue = Issue.create(
            "issues",
            "iOS App",
            "App crashes on launch",
            "test@example.com"
        );

        expect(issue.id).toBeNull();
        expect(issue.type).toBe("issues");
        expect(issue.platform).toBe("iOS App");
        expect(issue.message).toBe("App crashes on launch");
        expect(issue.email).toBe("test@example.com");
    });

    it("should successfully create a valid feature request entity", () => {
        const issue = Issue.create(
            "feature_request",
            "Web App",
            "Add dark mode support",
            "USER@example.COM  "
        );

        expect(issue.type).toBe("feature_request");
        expect(issue.platform).toBe("Web App");
        expect(issue.message).toBe("Add dark mode support");
        expect(issue.email).toBe("user@example.com"); // Normalized
    });

    it("should throw InvalidEmailError for invalid email", () => {
        expect(() => {
            Issue.create("issues", "iOS", "crash", "invalid-email");
        }).toThrow(InvalidEmailError);
    });

    it("should throw InvalidIssueTypeError for invalid issue type", () => {
        expect(() => {
            Issue.create("invalid_type" as any, "iOS", "crash", "test@example.com");
        }).toThrow(InvalidIssueTypeError);
    });

    it("should throw MissingRequiredFieldError for empty platform", () => {
        expect(() => {
            Issue.create("issues", "  ", "crash", "test@example.com");
        }).toThrow(MissingRequiredFieldError);
    });

    it("should throw MissingRequiredFieldError for empty message", () => {
        expect(() => {
            Issue.create("issues", "iOS", "", "test@example.com");
        }).toThrow(MissingRequiredFieldError);
    });
});
