function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  console.log(prompt, size);

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    console.log("prompt==>", prompt, "size==>", size);
    const imageSize =
      size === "small"
        ? "256x256"
        : size === "medium"
        ? "512x512"
        : "1024x1024";

    console.log("sizee==>", imageSize);

    const response = await fetch("http://localhost:8000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        size: imageSize,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      console.log(response.error);
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
