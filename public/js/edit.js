document.addEventListener("DOMContentLoaded", async function () {
  const editForm = document.getElementById("editForm");
  const id = document.getElementById("userId").value;

  editForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    try {
      const response = await fetch(`/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
