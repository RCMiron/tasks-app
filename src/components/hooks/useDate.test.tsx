import useDate from "./useDate";
import { renderHook } from "@testing-library/react-hooks";

describe("useDate", () => {
    it("returns the date formated", () => {
        const { result } = renderHook(() => useDate("2021-09-01"));
        expect(result.current).toEqual("09/01/2021");
    });
})