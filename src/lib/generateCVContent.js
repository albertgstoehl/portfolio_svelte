import * as db from './db.js';
import fs from 'fs/promises';
import path from 'path';

export async function generateContent() {
  // Fetch collections
  const skills = await db.getSkills();
  const projects = await db.getProjects();
  const experience = await db.getExperience();
  const education = await db.getEducation();
  const contact = await db.getContact();
  const certificates = await db.getCertificates();

  // Base directory for output files
  const outputDir = path.resolve('./latex-files/content');

  // Generate LaTeX files
  await generateSkills(skills, outputDir);
  await generateProjects(projects, outputDir);
  await generateExperience(experience, outputDir);
  await generateEducation(education, outputDir);
  await generateContact(contact, outputDir);
  await generateCertificates(certificates, outputDir);

  console.log('Content files generated successfully.');
}

// Helper Functions
async function generateSkills(skills, outputDir) {
  const content = `
\\begin{description}[topsep=0pt]
${skills
  .map((skill) => `  \\item \\textbf{${skill.genre}}: ${skill.content}`)
  .join('\n')}
\\end{description}
  `;
  await fs.writeFile(path.join(outputDir, 'skills.tex'), content, 'utf-8');
  console.log('Written file: skills.tex');
}

async function generateProjects(projects, outputDir) {
  const content = `
\\section*{Projects}
${projects
  .map(
    (project) =>
      `\\textbf{${project.title}} \\\\ ${project.description} \\\\ \\textit{Tech Stack}: ${project.technologies.join(
        ', '
      )}`
  )
  .join('\n\n')}
  `;
  await fs.writeFile(path.join(outputDir, 'projects1.tex'), content, 'utf-8');
  console.log('Written file: projects1.tex');
}

async function generateExperience(experience, outputDir) {
  const content = `
\\section*{Experience}
${experience
  .map(
    (job) => `
\\textbf{${job.role} at ${job.company} (${job.start_date} -- ${job.end_date})}
\\begin{itemize}
${job.tasks.map((task) => `  \\item ${task}`).join('\n')}
\\end{itemize}
`
  )
  .join('\n')}
  `;
  await fs.writeFile(path.join(outputDir, 'experience1.tex'), content, 'utf-8');
  console.log('Written file: experience1.tex');
}

async function generateEducation(education, outputDir) {
  const content = `
\\section*{Education}
${education
  .map(
    (edu) => `
\\textbf{${edu.degree.eng}} at ${edu.institution.eng} (${edu.start_date} -- ${edu.end_date})
`
  )
  .join('\n')}
  `;
  await fs.writeFile(path.join(outputDir, 'education1.tex'), content, 'utf-8');
  console.log('Written file: education1.tex');
}

async function generateContact(contact, outputDir) {
  const content = `
\\section*{Contact Information}
\\textbf{Email:} ${contact.email} \\\\
\\textbf{Phone:} ${contact.phone} \\\\
\\textbf{Address:} ${contact.address}
  `;
  await fs.writeFile(path.join(outputDir, 'contact1.tex'), content, 'utf-8');
  console.log('Written file: contact1.tex');
}

async function generateCertificates(certificates, outputDir) {
  const content = `
\\section*{Certificates}
${certificates
  .map(
    (cert) =>
      `\\textbf{${cert.title}} issued by ${cert.organization} (${cert.date})`
  )
  .join('\n')}
  `;
  await fs.writeFile(path.join(outputDir, 'certificates1.tex'), content, 'utf-8');
  console.log('Written file: certificates1.tex');
}