// Advanced Protection System Script
function initializeAdvancedProtection() {
    console.log('Initializing Advanced Protection System...');
    
    // Terminal functionality
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const scanStatus = document.getElementById('scan-status');
    const threatBadge = document.getElementById('threat-badge');
    const threatLevel = document.getElementById('threat-level');
    
    // Check if elements exist
    if (!terminalInput || !terminalOutput) {
        console.warn('Terminal elements not found, retrying in 500ms...');
        setTimeout(initializeAdvancedProtection, 500);
        return;
    }
    
    console.log('Terminal elements found, setting up functionality...');
    
    // Enhanced terminal commands
    const commands = {
        'help': 'Available commands: status, scan, threats, clear, help, security, monitor, logs',
        'status': 'All systems operational. Firewall: ACTIVE | AI Defense: ONLINE | Network: SECURE | Uptime: 99.9%',
        'scan': 'Initiating comprehensive security scan... Analyzing 2,847 endpoints... Threat level: LOW | 0 vulnerabilities found.',
        'threats': 'Current threat level: LOW | Blocked today: 1,247 | Active monitors: 100 | Last incident: None',
        'security': 'Security modules: Firewall (100%) | AI Defense (95%) | Network Monitor (88%) | Intrusion Detection (100%)',
        'monitor': 'Real-time monitoring active. Scanning network traffic... All connections secure.',
        'logs': 'Recent activity: [12:34] Firewall rule updated | [12:33] Threat blocked | [12:32] System scan completed',
        'clear': 'CLEAR_TERMINAL'
    };
    
    // Handle terminal input
    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            
            if (command) {
                // Add command to terminal
                addTerminalLine(`user@security:~$ ${command}`, 'text-warning');
                
                // Execute command
                if (commands[command]) {
                    if (commands[command] === 'CLEAR_TERMINAL') {
                        terminalOutput.innerHTML = '<div class="terminal-line text-success">> Terminal cleared. Type "help" for commands.</div>';
                    } else {
                        addTerminalLine(commands[command], 'text-success');
                    }
                } else {
                    addTerminalLine(`Command not found: ${command}. Type 'help' for available commands.`, 'text-danger');
                }
                
                this.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        }
    });
    
    function addTerminalLine(text, className = 'text-success') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = `> ${text}`;
        terminalOutput.appendChild(line);
    }
    
    // Add welcome message
    setTimeout(() => {
        addTerminalLine('Advanced Protection Terminal ready. Type "help" for commands.', 'text-info');
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }, 1000);
    
    // Animated stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    function animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target % 1 === 0 ? target : target.toFixed(1);
                clearInterval(timer);
            } else {
                element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
            }
        }, 16);
    }
    
    function updateThreatLevel(level) {
        if (!threatLevel || !threatBadge) return;
        
        const levels = ['●○○○○', '●●○○○', '●●●○○', '●●●●○', '●●●●●'];
        threatLevel.textContent = levels[level - 1];
        
        if (level <= 2) {
            threatBadge.textContent = 'LOW THREAT';
            threatBadge.className = 'ms-auto badge threat-badge';
        } else if (level <= 3) {
            threatBadge.textContent = 'MEDIUM THREAT';
            threatBadge.className = 'ms-auto badge threat-badge medium';
        } else {
            threatBadge.textContent = 'HIGH THREAT';
            threatBadge.className = 'ms-auto badge threat-badge high';
        }
    }
    
    // Enhanced auto-add terminal messages with more variety
    const autoMessages = [
        { text: 'Network perimeter scan completed. No anomalies detected.', delay: 5000, type: 'text-info' },
        { text: 'AI Defense system updated to latest threat database v2.1.4', delay: 8000, type: 'text-success' },
        { text: 'Firewall rules optimized for maximum protection efficiency.', delay: 12000, type: 'text-info' },
        { text: 'Intrusion detection system: All sensors operational.', delay: 16000, type: 'text-success' },
        { text: 'Security certificate validation completed successfully.', delay: 20000, type: 'text-info' },
        { text: 'Behavioral analysis engine: Learning new threat patterns.', delay: 24000, type: 'text-warning' }
    ];
    
    autoMessages.forEach(msg => {
        setTimeout(() => {
            if (terminalOutput) {
                addTerminalLine(msg.text, msg.type);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        }, msg.delay);
    });
    
    // Enhanced threat level simulation with more realistic patterns
    let threatLevelValue = 1;
    let threatUpdateCount = 0;
    
    setInterval(() => {
        threatUpdateCount++;
        
        // Simulate realistic threat patterns
        if (threatUpdateCount % 10 === 0) {
            // Occasional medium threat
            threatLevelValue = Math.random() > 0.7 ? 3 : Math.floor(Math.random() * 2) + 1;
        } else {
            // Mostly low threats
            threatLevelValue = Math.floor(Math.random() * 2) + 1;
        }
        
        updateThreatLevel(threatLevelValue);
        
        // Add threat-related terminal messages
        if (threatLevelValue >= 3 && terminalOutput) {
            setTimeout(() => {
                addTerminalLine('Elevated threat detected. Initiating enhanced monitoring.', 'text-warning');
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, 1000);
        }
    }, 15000);
    
    // Enhanced module interaction with visual feedback
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const module = this.dataset.module;
            const moduleName = this.querySelector('.fw-semibold').textContent;
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            if (terminalOutput) {
                addTerminalLine(`Accessing ${moduleName} diagnostics...`, 'text-warning');
                
                setTimeout(() => {
                    const statusMessages = {
                        'firewall': `${moduleName}: 1,247 rules active | Last update: 2 min ago | Status: OPTIMAL`,
                        'ai-defense': `${moduleName}: Neural network trained on 2.1M samples | Accuracy: 99.7% | Status: LEARNING`,
                        'network': `${moduleName}: 847 endpoints monitored | Bandwidth: 98.2% available | Status: SECURE`,
                        'monitor': `${moduleName}: 24/7 surveillance active | Sensors: 100/100 online | Status: VIGILANT`
                    };
                    
                    addTerminalLine(statusMessages[module] || `${moduleName}: All systems operational`, 'text-success');
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, 800);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(255, 140, 0, 0.6)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 140, 0, 0.3)';
        });
    });
    
    console.log('✅ Advanced Protection System initialized with enhanced features');
}

// Auto-initialize when DOM is ready or call manually
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdvancedProtection);
} else {
    initializeAdvancedProtection();
}