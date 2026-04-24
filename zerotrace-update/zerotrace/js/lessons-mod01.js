// ── MODULE 01: RECONNAISSANCE & OSINT ──
window.MOD01 = {
  id:'mod01', title:'Reconnaissance & OSINT',
  lessons:{
    1:{title:"Intro to OSINT: The Investigator's Mindset",duration:'25 min',difficulty:'Beginner',
    html:`<h1>Lesson 1: Intro to OSINT — The Investigator's Mindset</h1>
<div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Beginner</span><span>📦 Module 01 · Lesson 1/10</span></div>
<p>Open-Source Intelligence (OSINT) is the practice of collecting and analysing publicly available information to produce actionable intelligence. Before a single exploit is run, before a single password is guessed — a skilled attacker knows their target inside and out. This is OSINT.</p>
<div class="highlight-box">💡 <strong>Key Principle:</strong> Every digital action leaves a trace. OSINT is the art of following those traces — legally, methodically, and without ever touching the target directly.</div>
<h2>What Is OSINT?</h2>
<p>OSINT stands for <strong>Open-Source Intelligence</strong>. "Open" means all information comes from publicly accessible sources — no hacking, no intrusion, no illegal access. Government agencies, private investigators, security researchers, journalists, and hackers all use OSINT extensively.</p>
<p>In cybersecurity, OSINT is the first phase of every engagement — part of the larger <strong>Reconnaissance</strong> phase in the ethical hacking methodology. The goal is to gather maximum information about a target without alerting them.</p>
<h2>Passive vs Active Reconnaissance</h2>
<table><tr><th>Type</th><th>Definition</th><th>Example</th></tr>
<tr><td>Passive Recon</td><td>Gathering data without direct contact with the target</td><td>WHOIS lookup, Google search, social media profiling</td></tr>
<tr><td>Active Recon</td><td>Directly interacting with the target system</td><td>Port scanning (Nmap), banner grabbing, ping sweeps</td></tr></table>
<p>OSINT falls almost entirely under <strong>passive reconnaissance</strong>. You are a ghost — observing, never touching.</p>
<h2>The OSINT Mindset</h2>
<p>Technical tools are only 30% of OSINT. The remaining 70% is mindset. Here is how to think like an intelligence analyst:</p>
<ul>
<li><strong>Be systematic:</strong> Never jump randomly between sources. Define what you need, then go find it.</li>
<li><strong>Question everything:</strong> Cross-reference all data. One source does not make it true.</li>
<li><strong>Think laterally:</strong> If the front door is closed, check the windows. Indirect paths often yield more.</li>
<li><strong>Document obsessively:</strong> Screenshot, timestamp, and note every source. An investigation only matters if you can report it.</li>
<li><strong>Stay legal:</strong> Just because data is public doesn't make all uses ethical. Know your scope.</li>
</ul>
<h2>The Intelligence Cycle</h2>
<ol>
<li><strong>Planning & Direction:</strong> What do you need to know? Who is the target?</li>
<li><strong>Collection:</strong> Gather raw data from websites, social media, databases, public records.</li>
<li><strong>Processing:</strong> Organise and structure the data. Remove noise.</li>
<li><strong>Analysis:</strong> Interpret the data. What patterns emerge?</li>
<li><strong>Dissemination:</strong> Report findings clearly to those who need them.</li>
<li><strong>Feedback:</strong> Does the intel answer the original question? Loop back if needed.</li>
</ol>
<div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">osint_workflow.sh</span></div>
<div class="terminal-body"><span class="prompt">root@zerotrace:~$</span> <span class="cmd">cat osint_workflow.txt</span><br>
<span class="output">[*] Phase 1: Define Target Scope</span><br><span class="output">    Target: example-corp.com | Goal: Map external attack surface</span><br><br>
<span class="output">[*] Phase 2: Passive Collection</span><br><span class="output">    → WHOIS lookup, DNS enumeration, Google dorking, LinkedIn profiling</span><br><br>
<span class="hl">[+] Phase 3: Analysis Results</span><br><span class="hl">    → 3 subdomains found | 47 employee emails | Server tech stack identified</span></div></div>
<h2>Key OSINT Categories</h2>
<ul>
<li><strong>Technical Intelligence:</strong> IPs, domains, SSL certs, open ports, server tech.</li>
<li><strong>Social Intelligence (SOCMINT):</strong> Social media profiles, professional networks, online activity.</li>
<li><strong>Geospatial Intelligence (GEOINT):</strong> Satellite imagery, location check-ins, photo metadata.</li>
<li><strong>Financial Intelligence (FININT):</strong> Company registrations, patents, court filings.</li>
<li><strong>Human Intelligence (HUMINT):</strong> Profiles built from public data — resumes, interviews, news.</li>
</ul>
<div class="warning-box">⚠️ <strong>Legal Warning:</strong> Even public data can be misused. Always operate within the law and within your authorised engagement scope.</div>
<h2>Tools You'll Master in This Module</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button>Google Dorking      → Find exposed files and admin panels
WHOIS / DNS         → Map domain infrastructure  
SOCMINT             → Profile targets via social media
ExifTool            → Extract metadata from images
Wayback Machine     → Find deleted/archived content
Shodan / Censys     → Discover IoT devices and open services
theHarvester        → Automate email and domain collection
SpiderFoot          → Full-spectrum OSINT automation</div>`},

    2:{title:'Google Dorking: Exposing Hidden Data',duration:'30 min',difficulty:'Beginner',
    html:`<h1>Lesson 2: Google Dorking — Exposing Hidden Data</h1>
<div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 01 · Lesson 2/10</span></div>
<p>Google Dorking uses advanced search operators to find information indexed by Google that was never meant to be easily discovered. No hacking tools required — just knowledge of the right operators.</p>
<div class="highlight-box">💡 Google indexes millions of pages. Sometimes it indexes pages administrators forgot to secure or remove. Dorking exploits this oversight.</div>
<h2>Core Search Operators</h2>
<table><tr><th>Operator</th><th>Function</th><th>Example</th></tr>
<tr><td>site:</td><td>Limit to a domain</td><td>site:example.com</td></tr>
<tr><td>filetype:</td><td>Specific file extension</td><td>filetype:pdf</td></tr>
<tr><td>intitle:</td><td>Search page titles</td><td>intitle:"admin login"</td></tr>
<tr><td>inurl:</td><td>Search within URLs</td><td>inurl:wp-admin</td></tr>
<tr><td>intext:</td><td>Search page body</td><td>intext:"password"</td></tr>
<tr><td>cache:</td><td>Google's cached version</td><td>cache:example.com</td></tr>
<tr><td>"quotes"</td><td>Exact phrase</td><td>"confidential report"</td></tr>
<tr><td>-minus</td><td>Exclude term</td><td>security -jobs</td></tr></table>
<h2>High-Value Dork Categories</h2>
<h3>1. Exposed Login Pages</h3>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button>intitle:"admin login" site:example.com
inurl:"/admin/login.php"
inurl:"/wp-login.php" site:example.com
intitle:"phpMyAdmin" inurl:"/phpmyadmin/"</div>
<h3>2. Exposed Files & Documents</h3>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button>site:example.com filetype:pdf "confidential"
site:example.com filetype:xls "password"
site:example.com filetype:sql
site:example.com filetype:env</div>
<h3>3. Configuration & Backup Files</h3>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button>site:example.com filetype:bak
site:example.com filetype:conf
inurl:"wp-config.php.bak"
inurl:".git" intitle:"index of"
filetype:env "DB_PASSWORD"</div>
<h3>4. Directory Listings</h3>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button>intitle:"index of" site:example.com
intitle:"index of /" "parent directory"
intitle:"index of" "backup"</div>
<h3>5. Compound Dorks</h3>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button># Find exposed credentials anywhere on a domain
site:example.com (filetype:env OR filetype:conf) "password"

# Find admin panels without auth
site:example.com inurl:(admin OR administrator OR login) -"register"

# Find GitHub secrets
site:github.com "example.com" password OR secret OR key OR token</div>
<h2>The Google Hacking Database (GHDB)</h2>
<p>Maintained by Offensive Security, the GHDB contains thousands of pre-built, tested dorks. Always check it before writing your own dork from scratch. Available at <strong>exploit-db.com/google-hacking-database</strong>.</p>
<div class="warning-box">⚠️ Google Dorking against systems you do not own or have written permission to test is illegal. Always operate within authorised scope.</div>`},

    3:{title:'WHOIS & DNS: Mapping Domain Infrastructure',duration:'30 min',difficulty:'Beginner',
    html:`<h1>Lesson 3: WHOIS & DNS — Mapping Domain Infrastructure</h1>
<div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 01 · Lesson 3/10</span></div>
<p>Every domain on the internet is registered somewhere and resolves through DNS. Both systems leave rich intelligence that can map an organisation's entire internet-facing infrastructure — often in minutes.</p>
<h2>WHOIS Lookups</h2>
<div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">whois_demo</span></div>
<div class="terminal-body"><span class="prompt">root@zerotrace:~$</span> <span class="cmd">whois example.com</span><br>
<span class="hl">Domain Name: EXAMPLE.COM</span><br>
<span class="output">Registrar: Example Registrar, Inc.</span><br>
<span class="output">Creation Date: 1995-08-14T04:00:00Z</span><br>
<span class="output">Expiry Date:   2025-08-13T04:00:00Z</span><br>
<span class="hl">Registrant Organization: IANA</span><br>
<span class="output">Name Server: A.IANA-SERVERS.NET</span></div></div>
<h2>Critical DNS Record Types</h2>
<table><tr><th>Record</th><th>Purpose</th><th>OSINT Value</th></tr>
<tr><td>A</td><td>Domain → IPv4</td><td>Server IP location</td></tr>
<tr><td>MX</td><td>Mail server</td><td>Email provider, anti-spam tech</td></tr>
<tr><td>NS</td><td>Name server</td><td>DNS hosting provider</td></tr>
<tr><td>TXT</td><td>Text records</td><td>SPF, DKIM, cloud service verification codes</td></tr>
<tr><td>CNAME</td><td>Alias</td><td>Reveals CDN and cloud services used</td></tr>
<tr><td>SOA</td><td>Start of Authority</td><td>Admin email — sometimes unmasked!</td></tr></table>
<h2>DNS Enumeration Commands</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button># A record (IP address)
dig example.com A

# Mail servers
dig example.com MX

# TXT records (reveal cloud services!)
dig example.com TXT

# All records
dig example.com ANY

# Reverse DNS
dig -x 93.184.216.34</div>
<h2>Subdomain Enumeration</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button># 1. Certificate Transparency Logs (best passive method)
#    Visit: crt.sh → search: %.example.com

# 2. Google dorking
site:*.example.com -www

# 3. Subfinder (passive)
subfinder -d example.com

# 4. Amass (authorised targets only)
amass enum -passive -d example.com</div>
<div class="highlight-box">💡 TXT records reveal which SaaS platforms a company uses (Google Workspace, Microsoft 365, Salesforce) — all potential attack vectors.</div>`},

    4:{title:'Social Media Intelligence (SOCMINT)',duration:'35 min',difficulty:'Beginner',
    html:`<h1>Lesson 4: Social Media Intelligence (SOCMINT)</h1>
<div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Beginner</span><span>📦 Module 01 · Lesson 4/10</span></div>
<p>SOCMINT is the collection and analysis of data from social networking platforms. People voluntarily post enormous amounts of sensitive information online. For an OSINT analyst, social media is one of the richest intelligence sources available.</p>
<h2>LinkedIn Intelligence</h2>
<p>LinkedIn is the single most valuable OSINT resource for corporate intelligence — a self-maintained, regularly updated database of an organisation's employees, technologies, and structure.</p>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button># LinkedIn search dorks (use in Google)
site:linkedin.com/in "Target Company" "security engineer"
site:linkedin.com/in "Target Company" "network administrator"
site:linkedin.com/in "Target Company" "IT manager"

# Job posting analysis reveals tech stack
site:linkedin.com/jobs "Target Company" "experience with"</div>
<h2>What to Extract from LinkedIn</h2>
<ul>
<li><strong>Employee names and roles:</strong> Build a complete org chart. Identify IT, security, and C-suite.</li>
<li><strong>Technology stack:</strong> Skills sections reveal AWS, Cisco, Palo Alto, Active Directory, etc.</li>
<li><strong>Email patterns:</strong> One confirmed email lets you deduce the pattern for all employees.</li>
<li><strong>Job postings:</strong> Hiring for specific techs reveals what's in their infrastructure stack.</li>
</ul>
<h2>Building a Target Profile</h2>
<div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">target_profile.txt</span></div>
<div class="terminal-body"><span class="hl">[TARGET] John Smith — IT Manager @ TargetCorp</span><br>
<span class="output">LinkedIn Skills: Cisco ASA, Palo Alto, VMware, Windows Server</span><br>
<span class="output">Certifications: CCNP, CompTIA Security+</span><br>
<span class="output">Twitter: mentioned "migrating to Azure" Feb 2024</span><br><br>
<span class="hl">[DEDUCED EMAIL]  john.smith@targetcorp.com</span><br>
<span class="hl">[TECH STACK]     Cisco ASA Firewall, VMware, Azure AD</span></div></div>
<div class="warning-box">⚠️ This lesson covers publicly accessible information only. Creating fake accounts or accessing private content is illegal.</div>`},

    5:{title:'Metadata Analysis with ExifTool',duration:'25 min',difficulty:'Beginner',
    html:`<h1>Lesson 5: Metadata Analysis with ExifTool</h1>
<div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Beginner</span><span>📦 Module 01 · Lesson 5/10</span></div>
<p>Every digital file carries hidden metadata — information about the file itself. Images, documents, and PDFs embed metadata automatically. For an OSINT analyst, this can reveal GPS coordinates, device information, author names, and timestamps — often without the creator knowing.</p>
<div class="highlight-box">💡 <strong>Real Case:</strong> In 2012, a journalist published an iPhone photo of John McAfee (hiding from authorities). The EXIF data contained GPS coordinates. He was found within hours.</div>
<h2>Installing and Using ExifTool</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button># Install
sudo apt install libimage-exiftool-perl

# View ALL metadata
exiftool image.jpg

# GPS only
exiftool -GPS* image.jpg

# Output as JSON
exiftool -json image.jpg

# Remove ALL metadata before publishing
exiftool -all= image.jpg</div>
<div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">exiftool output</span></div>
<div class="terminal-body"><span class="prompt">root@zerotrace:~$</span> <span class="cmd">exiftool target_photo.jpg</span><br>
<span class="hl">Make                   : Apple</span><br>
<span class="hl">Camera Model Name      : iPhone 14 Pro</span><br>
<span class="output">Date/Time Original     : 2024:01:15 14:32:07</span><br>
<span class="hl">GPS Latitude           : 3 deg 52' 9.84" N</span><br>
<span class="hl">GPS Longitude          : 11 deg 31' 4.92" E</span><br>
<span class="hl">GPS Altitude           : 750.3 m Above Sea Level</span></div></div>
<h2>Document Metadata</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button># Word/Excel/PDF metadata
exiftool document.docx
exiftool report.pdf

# Key fields:
# Author          → Username of creator
# Last Modified By→ Last editor
# Company         → Registered company name
# Creator Tool    → Software used to create it</div>`},

    6:{title:'The Wayback Machine: Finding Deleted Content',duration:'20 min',difficulty:'Beginner',
    html:`<h1>Lesson 6: The Wayback Machine — Finding Deleted Content</h1>
<div class="lesson-meta"><span>⏱ 20 min</span><span>🎯 Beginner</span><span>📦 Module 01 · Lesson 6/10</span></div>
<p>The Internet Archive's Wayback Machine has archived over 800 billion web pages since 1996. For OSINT analysts, this means you can see what a website looked like in the past — including content that has since been deleted.</p>
<h2>What You Can Find</h2>
<ul>
<li>Employee directories removed from the main site</li>
<li>Login pages now hidden behind a VPN</li>
<li>Old configuration pages and sitemaps</li>
<li>Job descriptions revealing internal technologies</li>
<li>Previously posted email addresses and phone numbers</li>
<li>Old source code revealing frameworks and internal paths</li>
</ul>
<h2>CDX API — Mass URL Extraction</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Get ALL archived URLs for a domain (find forgotten endpoints)
curl "http://web.archive.org/cdx/search/cdx?url=*.example.com&output=text&fl=original&collapse=urlkey"

# Filter for interesting paths
curl "http://web.archive.org/cdx/search/cdx?url=*.targetcorp.com&output=text&fl=original&collapse=urlkey" \
  | grep -i "admin\|login\|config\|backup\|\.env\|\.git"</div>
<div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">wayback_enum</span></div>
<div class="terminal-body"><span class="hl">https://targetcorp.com/admin/</span><br>
<span class="hl">https://targetcorp.com/admin/login.php</span><br>
<span class="output">https://targetcorp.com/backup/2019/</span><br>
<span class="output">https://targetcorp.com/config/database.php</span><br>
<span class="hl">https://old.targetcorp.com/login</span></div></div>
<div class="highlight-box">💡 <strong>Pro Tip:</strong> View archived source code by prepending <code>view-source:</code> to any Wayback Machine URL to find hardcoded credentials, internal API endpoints, and developer comments.</div>`},

    7:{title:'Shodan & Censys: The Internet\'s Search Engines',duration:'35 min',difficulty:'Intermediate',
    html:`<h1>Lesson 7: Shodan & Censys — The Internet's Search Engines</h1>
<div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 01 · Lesson 7/10</span></div>
<p>Shodan and Censys are search engines for internet-connected <em>devices</em>. They continuously scan the entire internet, recording open ports, service banners, SSL certificates, and device information. The result is a searchable database of millions of exposed devices.</p>
<div class="highlight-box">💡 Shodan has indexed printers with no password, hospital equipment, industrial SCADA systems, power plant controllers, and home routers — all directly accessible from the internet with default or no credentials.</div>
<h2>Shodan Search Operators</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Search by organisation
org:"Target Corporation"

# Search by country
country:CM    # Cameroon
country:NG    # Nigeria

# Search by port
port:22       # SSH exposed to internet
port:3389     # RDP (Remote Desktop)
port:21       # FTP

# Find exposed databases
product:MongoDB -authentication
port:9200 product:elastic

# Industrial control systems
category:ics

# Specific hostname
hostname:example.com

# Organisation's full exposure
org:"GeP ProTech" OR hostname:*.cm</div>
<h2>Reading a Shodan Result</h2>
<table><tr><th>Field</th><th>Intelligence Value</th></tr>
<tr><td>IP Address</td><td>Direct target address</td></tr>
<tr><td>Ports Open</td><td>Available attack surface</td></tr>
<tr><td>Organization</td><td>Who owns the IP</td></tr>
<tr><td>OS</td><td>Operating system — helps identify vulnerabilities</td></tr>
<tr><td>Banner/Data</td><td>Server response with version info</td></tr>
<tr><td>SSL Certificate</td><td>Organisation name and associated domains</td></tr>
<tr><td>Vulnerabilities</td><td>Known CVEs (paid plan)</td></tr></table>`},

    8:{title:'Automated OSINT: theHarvester & SpiderFoot',duration:'30 min',difficulty:'Intermediate',
    html:`<h1>Lesson 8: Automated Tools — theHarvester & SpiderFoot</h1>
<div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Intermediate</span><span>📦 Module 01 · Lesson 8/10</span></div>
<p>Manual OSINT is powerful but slow. Automated tools collect from dozens of sources simultaneously, saving hours of work.</p>
<h2>theHarvester</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Pre-installed in Kali Linux. Basic syntax:
theHarvester -d <domain> -b <source> -l <limit>

# Use all sources
theHarvester -d example.com -b all

# Focused sources (faster)
theHarvester -d example.com -b google,linkedin,bing

# Save output
theHarvester -d example.com -b all -f report</div>
<div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">theHarvester output</span></div>
<div class="terminal-body"><span class="prompt">root@zerotrace:~$</span> <span class="cmd">theHarvester -d targetcorp.com -b google,linkedin</span><br><br>
<span class="hl">[*] Emails found: 23</span><br>
<span class="output">  john.smith@targetcorp.com</span><br>
<span class="output">  sarah.jones@targetcorp.com</span><br><br>
<span class="hl">[*] Hosts found: 8</span><br>
<span class="output">  mail.targetcorp.com: 192.168.1.10</span><br>
<span class="output">  vpn.targetcorp.com:  192.168.1.15</span><br>
<span class="output">  dev.targetcorp.com:  10.0.0.5</span></div></div>
<h2>SpiderFoot</h2>
<p>SpiderFoot integrates with over 200 data sources and builds a complete intelligence picture — correlating data across people, organisations, IPs, domains, and social media.</p>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Install and launch web interface
pip3 install spiderfoot
python3 sf.py -l 127.0.0.1:5001
# Open: http://127.0.0.1:5001</div>`},

    9:{title:'Email Verification & Breach Intelligence',duration:'25 min',difficulty:'Intermediate',
    html:`<h1>Lesson 9: Email Verification & Breach Intelligence</h1>
<div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Intermediate</span><span>📦 Module 01 · Lesson 9/10</span></div>
<p>A single confirmed email address can be a thread that unravels an entire digital identity — connecting accounts, exposing old passwords, and linking pseudonymous profiles to real people.</p>
<h2>Email Format Discovery</h2>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Common corporate email patterns to test:
firstname.lastname@company.com   # Most common
f.lastname@company.com
firstname@company.com
flastname@company.com

# Tools to discover the format:
# 1. Hunter.io        → shows the format for any domain
# 2. theHarvester     → collects real emails to deduce pattern
# 3. LinkedIn + Google dorks</div>
<h2>Have I Been Pwned (HIBP)</h2>
<p>Created by Troy Hunt, HIBP aggregates breach data so you can check if an email appeared in a data breach. Available at <strong>haveibeenpwned.com</strong>.</p>
<div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># HIBP API
curl "https://haveibeenpwned.com/api/v3/breachedaccount/test@example.com" \
  -H "hibp-api-key: YOUR-KEY"

# Check password exposure (k-Anonymity — only sends first 5 chars of SHA-1 hash)
echo -n "password123" | sha1sum
# First 5 chars of result → send to:
curl "https://api.pwnedpasswords.com/range/CBFDA"</div>
<h2>Password Pattern Intelligence</h2>
<ul>
<li>People use <em>company name + year</em>: Company2026!</li>
<li>Reuse across services: forum password may still work on corporate VPN</li>
<li>Predictable evolution: Company2025! → Company2026!</li>
</ul>
<div class="warning-box">⚠️ Using breached passwords without authorisation is illegal. This knowledge is purely defensive — understand attacker techniques to defend against them.</div>`},

    10:{title:'OSINT Report Writing: Documenting Without a Trace',duration:'20 min',difficulty:'Beginner',
    html:`<h1>Lesson 10: OSINT Report Writing — Documenting Without a Trace</h1>
<div class="lesson-meta"><span>⏱ 20 min</span><span>🎯 Beginner</span><span>📦 Module 01 · Lesson 10/10</span></div>
<p>An investigation is only as valuable as the report it produces. All the intelligence you gather is worthless if you can't communicate it clearly, professionally, and actionably.</p>
<h2>The OSINT Report Structure</h2>
<ol>
<li><strong>Executive Summary:</strong> 1-2 paragraphs for non-technical management. What was found? What is the risk?</li>
<li><strong>Scope and Methodology:</strong> What was authorised? What sources were used?</li>
<li><strong>Technical Findings:</strong> Detailed findings by category (domains, emails, personnel, exposed services).</li>
<li><strong>Risk Assessment:</strong> Critical / High / Medium / Low for each finding.</li>
<li><strong>Recommendations:</strong> Clear, actionable remediation steps.</li>
<li><strong>Appendices:</strong> Raw data, screenshots, tool outputs.</li>
</ol>
<div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">osint_report_template.md</span></div>
<div class="terminal-body"><span class="hl"># OSINT RECONNAISSANCE REPORT</span><br>
<span class="output">Target: targetcorp.com | Date: 2024-01-15 | Classification: CONFIDENTIAL</span><br><br>
<span class="hl">## FINDINGS SUMMARY</span><br>
<span class="err">[CRITICAL] Exposed admin panel: admin.targetcorp.com</span><br>
<span class="output">[HIGH]     47 employee emails discoverable via OSINT</span><br>
<span class="output">[MEDIUM]   Server version disclosure on mail server</span><br>
<span class="output">[LOW]      Old employee names still in WHOIS history</span></div></div>
<h2>Operational Security (OPSEC) During OSINT</h2>
<ul>
<li><strong>Use a VPN:</strong> Your queries should not originate from your home or work IP.</li>
<li><strong>Use a VM:</strong> Run OSINT tools in an isolated virtual machine.</li>
<li><strong>Anonymous browsing:</strong> Tor Browser or a dedicated privacy profile.</li>
<li><strong>Never log in:</strong> Don't use social media accounts during OSINT — creates an audit trail.</li>
<li><strong>Pace your requests:</strong> Rapid queries trigger rate limits and alerts.</li>
</ul>
<div class="highlight-box">🏆 <strong>MODULE 01 COMPLETE!</strong> You now have a full OSINT toolkit — passive recon, Google dorking, DNS/WHOIS analysis, social media intelligence, metadata analysis, Wayback Machine research, Shodan/Censys scanning, automated collection, and professional reporting. Proceed to Module 02: Network Fundamentals.</div>`},
  }
};
