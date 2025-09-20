// Rewards Dashboard functionality
let currentDashboardMember = null;

document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  const membershipInput = document.getElementById('rewards-membership-number');
  const loginBtn = document.getElementById('rewards-login-btn');
  const loginError = document.getElementById('rewards-login-error');
  const memberLogin = document.querySelector('.member-login');
  const memberDashboard = document.getElementById('member-dashboard');

  // Login functionality
  function loginMember() {
    const membershipNumber = membershipInput.value.trim().toUpperCase();
    
    // Clear previous errors
    loginError.textContent = '';
    
    if (!membershipNumber) {
      loginError.textContent = 'Please enter your membership number.';
      return;
    }
    
    // Validate membership
    const member = membershipSystem.validateMembership(membershipNumber);
    
    if (member) {
      currentDashboardMember = member;
      showDashboard();
    } else {
      loginError.textContent = 'Invalid membership number. Please check and try again.';
    }
  }

  // Show dashboard
  function showDashboard() {
    if (!currentDashboardMember) return;
    
    // Hide login form and show dashboard
    memberLogin.style.display = 'none';
    memberDashboard.style.display = 'grid';
    
    // Update member info
    document.getElementById('dashboard-member-name').textContent = `Welcome back, ${currentDashboardMember.name}!`;
    document.getElementById('dashboard-member-level').textContent = currentDashboardMember.level;
    document.getElementById('dashboard-member-points').textContent = currentDashboardMember.points;
    
    // Load available rewards
    loadAvailableRewards();
    
    // Load points history
    loadPointsHistory();
  }

  // Load available rewards
  function loadAvailableRewards() {
    const availableRewardsContainer = document.getElementById('available-rewards');
    const availableRewards = membershipSystem.getAvailableRewards(currentDashboardMember.points);
    
    if (availableRewards.length === 0) {
      availableRewardsContainer.innerHTML = '<p class="no-rewards">No rewards available yet. Keep earning points!</p>';
      return;
    }
    
    let rewardsHTML = '';
    availableRewards.forEach(reward => {
      rewardsHTML += `
        <div class="reward-card">
          <div class="reward-info">
            <div class="reward-discount">${reward.discount}</div>
            <div class="reward-cost">${reward.points} points</div>
            <div class="reward-description">${reward.description}</div>
          </div>
          <button class="btn btn-primary reward-redeem-btn" onclick="redeemReward('${reward.id}', ${reward.points})">
            Redeem
          </button>
        </div>
      `;
    });
    
    availableRewardsContainer.innerHTML = rewardsHTML;
  }

  // Load points history
  function loadPointsHistory() {
    const historyContainer = document.getElementById('points-history-list');
    const transactions = JSON.parse(localStorage.getItem('pb_points_transactions') || '[]');
    
    // Filter transactions for current member
    const memberTransactions = transactions.filter(t => 
      t.membershipNumber === currentDashboardMember.membershipNumber
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (memberTransactions.length === 0) {
      historyContainer.innerHTML = '<p class="no-history">No transaction history yet.</p>';
      return;
    }
    
    let historyHTML = '';
    memberTransactions.forEach(transaction => {
      const date = new Date(transaction.timestamp).toLocaleDateString();
      const source = transaction.source === 'booking' ? 'Service Booking' : 'Product Purchase';
      
      historyHTML += `
        <div class="history-item">
          <div class="history-info">
            <div class="history-source">${source}</div>
            <div class="history-date">${date}</div>
          </div>
          <div class="history-points">+${transaction.points}</div>
        </div>
      `;
    });
    
    historyContainer.innerHTML = historyHTML;
  }

  // Global redeem function
  window.redeemReward = function(rewardId, pointsCost) {
    if (!currentDashboardMember) return;
    
    if (currentDashboardMember.points < pointsCost) {
      alert('Insufficient points for this reward.');
      return;
    }
    
    const reward = REWARDS_CONFIG.redemption.find(r => r.id === rewardId);
    if (!reward) return;
    
    // Deduct points
    currentDashboardMember.points -= pointsCost;
    
    // Update member in mock database
    mockMembers[currentDashboardMember.membershipNumber].points = currentDashboardMember.points;
    
    // Log redemption transaction
    const transaction = {
      timestamp: new Date().toISOString(),
      membershipNumber: currentDashboardMember.membershipNumber,
      points: -pointsCost,
      source: 'redemption',
      newTotal: currentDashboardMember.points,
      rewardId: rewardId,
      rewardDescription: reward.description
    };
    
    membershipSystem.logTransaction(transaction);
    
    alert(`Congratulations! You've redeemed ${reward.discount} off your next visit!\n\nRemaining points: ${currentDashboardMember.points}`);
    
    // Refresh dashboard
    showDashboard();
  };

  // Event listeners
  loginBtn.addEventListener('click', loginMember);
  
  membershipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loginMember();
    }
  });
});
