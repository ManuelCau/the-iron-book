import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { expect, vi, it, describe, beforeEach } from "vitest";

describe("useLocalStorage hook", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it("should initialize with value from localStorage if present", () => {
    (window.localStorage.getItem as any).mockReturnValue(
      JSON.stringify("stored-value")
    );

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current[0]).toBe("stored-value");
  });

  it("should update localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    act(() => {
      result.current[1]("new-value");
    });

    expect(result.current[0]).toBe("new-value");
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "test-key",
      '"new-value"'
    );
  });

  it("should handle JSON parse errors", () => {
    (window.localStorage.getItem as any).mockReturnValue("invalid-json");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current[0]).toBe("default");
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should handle JSON stringify errors ", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const circular: any = {};
    circular.self = circular;

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    act(() => {
      result.current[1](circular);
    });

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
