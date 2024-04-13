/**
 * Validates a comic ID to ensure it is a non-empty string representing a valid number.
 * @param {string} comicId - The comic ID to validate.
 * @returns {boolean} True if the comic ID is valid, otherwise false.
 */
const isValidComicId = (comicId) => {
    // Check if comicId is a non-empty string
    if (typeof comicId !== "string" || !comicId.trim()) {
        return false; // Not a non-empty string
    }

    // Check if comicId represents a valid number
    return !isNaN(Number(comicId)); // Valid comicId
};

module.exports = isValidComicId;
