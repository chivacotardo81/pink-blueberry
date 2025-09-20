// Membership Management System
class MembershipSystem {
  constructor() {
    this.currentMember = null;
  }

  // Validate membership number
  validateMembership(membershipNumber) {
    const member = mockMembers[membershipNumber.toUpperCase()];
    return member || null;
  }

  // Calculate points for booking
  calculateBookingPoints(servicePrice, membershipLevel = 'Bronze') {
    const basePoints = servicePrice * REWARDS_CONFIG.points.booking.perDollar;
    const levelMultiplier = this.getLevelMultiplier(membershipLevel);
    return Math.floor(basePoints * levelMultiplier);
  }

  // Calculate points for purchase
  calculatePurchasePoints(cartTotal, membershipLevel = 'Bronze') {
    let basePoints = cartTotal * REWARDS_CONFIG.points.products.perDollar;
    
    // Bonus for large orders
    if (cartTotal >= REWARDS_CONFIG.points.products.bonusThreshold) {
      basePoints *= REWARDS_CONFIG.points.products.bonusMultiplier;
    }
    
    const levelMultiplier = this.getLevelMultiplier(membershipLevel);
    return Math.floor(basePoints * levelMultiplier);
  }

  // Get multiplier for membership level
  getLevelMultiplier(levelName) {
    const level = REWARDS_CONFIG.membershipLevels.find(l => l.name === levelName);
    return level ? level.multiplier : 1.0;
  }

  // Get current membership level
  getMembershipLevel(points) {
    const levels = [...REWARDS_CONFIG.membershipLevels].reverse();
    const level = levels.find(l => points >= l.minPoints);
    return level || REWARDS_CONFIG.membershipLevels[0];
  }

  // Add points to member account
  addPoints(membershipNumber, points, source) {
    const member = mockMembers[membershipNumber.toUpperCase()];
    if (member) {
      member.points += points;
      member.level = this.getMembershipLevel(member.points).name;
      
      // Log transaction
      const transaction = {
        timestamp: new Date().toISOString(),
        membershipNumber: membershipNumber,
        points: points,
        source: source, // 'booking' or 'purchase'
        newTotal: member.points
      };
      
      this.logTransaction(transaction);
      return member;
    }
    return null;
  }

  // Log points transaction
  logTransaction(transaction) {
    const transactions = JSON.parse(localStorage.getItem('pb_points_transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('pb_points_transactions', JSON.stringify(transactions));
  }

  // Get available rewards for points amount
  getAvailableRewards(points) {
    return REWARDS_CONFIG.redemption.filter(reward => points >= reward.points);
  }
}

// Global instance
const membershipSystem = new MembershipSystem();
