import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const envVars = Object.fromEntries(
  envContent.split(/\r?\n/)
    .filter(Boolean)
    .filter(line => !line.startsWith('#'))
    .map(line => {
      const idx = line.indexOf('=');
      if (idx === -1) return null;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      return [key, value];
    })
    .filter(Boolean)
);

process.env = { ...process.env, ...envVars };

const jobs = [
  {
    title: 'Senior Software Development Engineer in Test',
    company: 'Experian',
    location: 'Hyderabad (Hybrid)',
    status: 'Blocked by LinkedIn UI',
    notes: 'Search page reached, but the apply flow was not accessible from automation due to LinkedIn UI and extension blocking.'
  },
  {
    title: 'QA - Automation Testing Engineer, AVP',
    company: 'State Street',
    location: 'Hyderabad',
    status: 'Blocked by LinkedIn UI',
    notes: 'Visible in search results; application action could not be completed from the browser session.'
  },
  {
    title: 'Senior Test Engineer - Automation QE',
    company: 'CGI',
    location: 'Hyderabad',
    status: 'Blocked by LinkedIn UI',
    notes: 'Visible in search results; no confirmed application submission.'
  },
  {
    title: 'Senior QA Engineer (Data Platform Testing)',
    company: 'Experian',
    location: 'Hyderabad (Hybrid)',
    status: 'Blocked by LinkedIn UI',
    notes: 'Visible in search results; apply action blocked by site protections.'
  }
];

const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LinkedIn Job Application Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #222; }
    h1 { color: #0a66c2; }
    table { border-collapse: collapse; width: 100%; margin-top: 16px; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background: #f3f6f8; }
    .status { font-weight: bold; }
  </style>
</head>
<body>
  <h1>LinkedIn Job Application Report</h1>
  <p><strong>Account:</strong> ${process.env.USERNAME || 'Not provided'}</p>
  <p><strong>Search:</strong> QA Automation jobs in Hyderabad</p>
  <p><strong>Filter:</strong> Product-based companies prioritised</p>
  <p><strong>Overall status:</strong> LinkedIn login and search results were reached, but automated application submission was blocked by dynamic UI and extension-related page issues.</p>
  <p><strong>Last verified:</strong> ${new Date().toISOString().slice(0, 10)}</p>
  <table>
    <thead>
      <tr>
        <th>Job Title</th>
        <th>Company</th>
        <th>Location</th>
        <th>Status</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${jobs.map(job => `
        <tr>
          <td>${job.title}</td>
          <td>${job.company}</td>
          <td>${job.location}</td>
          <td class="status">${job.status}</td>
          <td>${job.notes}</td>
        </tr>`).join('')}
    </tbody>
  </table>
</body>
</html>`;

const outputDir = path.resolve(process.cwd(), 'reports');
fs.mkdirSync(outputDir, { recursive: true });
const outputFile = path.join(outputDir, 'linkedin_job_report.html');
fs.writeFileSync(outputFile, reportHtml, 'utf8');
console.log(`Report generated at ${outputFile}`);
