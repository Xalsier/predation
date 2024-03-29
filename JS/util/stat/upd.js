function updateEditInformation() {
  // Summing up the total number of files (edits)
  const totalEdits = editRecords.reduce((sum, record) => sum + record.Files, 0);
  document.getElementById('edit-count').textContent = totalEdits;

  // Finding the most recent edit date
  const mostRecentEdit = editRecords.reduce((latest, record) => {
      const recordDate = new Date(record.Date);
      return latest > recordDate ? latest : recordDate;
  }, new Date(0)); // Initialize with an early date

  // Calculating the time difference for the "last updated" message
  const diffInHours = Math.abs(new Date() - mostRecentEdit) / 36e5;
  let message = `${Math.round(diffInHours)} hr ago`;
  if (diffInHours >= 24) {
      const days = Math.round(diffInHours / 24);
      message = `${days} night${days > 1 ? 's' : ''} ago`;
  }
  document.getElementById('last-updated').textContent = message;
}

updateEditInformation();
