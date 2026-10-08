

def grader(output: str, expected: str) -> float:
    if output == expected:
        score = 1.0
    else:
        score = 0.0
    return score