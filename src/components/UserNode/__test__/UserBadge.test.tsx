import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import  UserBadge from "../UserBadge";

describe("UserBadge", () => {
  it("renders initials when photo is empty", () => {
    render(<UserBadge photo="" firstName="Gunter" lastName="Bhara" />);
    expect(screen.getByText("GB")).toBeInTheDocument();
  });

  it("renders initials when photo fails to load", async () => {
    render(
      <UserBadge
        photo="https://broken-url.example/missing.jpg"
        firstName="Athene"
        lastName="Amir"
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("AA")).toBeInTheDocument();
    });
  });

  it("renders photo when it loads successfully", async () => {
    class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_value: string) {
        setTimeout(() => this.onload?.(), 0);
      }
    }
    vi.stubGlobal("Image", MockImage);

    render(
      <UserBadge
        photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrbOEDJ_AWND7QmEhQqcH1nP0LbRKmOpYRKEHvowd6EKfYUw-rFg"
        firstName="Athene"
        lastName="Amir"
      />,
    );

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
