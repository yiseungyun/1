type ApiResponse =
  | { status: "success", data: string }
  | { status: "error", error: string }
  | { status: "timeout" };

function handleResponse(res: ApiResponse) {
  switch (res.status) {
    case "success":
      console.log(res.data);
      break;
    case "error":
      console.log(res.error);
      break;
    case "timeout":
      console.log("Request timed out");
      break;
    default:
      const _exhaustive: never = res;
      return _exhaustive;
  }
}

