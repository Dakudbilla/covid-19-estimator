const covid19ImpactEstimator = (data) => {
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }
  const { reportedCases, totalHospitalBeds } = data;
  const { avgDailyIncomePopulation } = data.region;
  // Impact object
  const impact = {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: reportedCases * 10240,
    severeCasesByRequestedTime: reportedCases * 1536,
    get hospitalBedsByRequestedTime() {
      return totalHospitalBeds * 35 - this.severeCasesByRequestedTime;
    },
    get casesForICUByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.5);
    },
    get casesForVentilatorsByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.02);
    },
    get dollarsInFlight() {
      return Math.trunc(
        this.infectionsByRequestedTime * 0.65 * avgDailyIncomePopulation * 30
      );
    }
  };

  // Severe Impact Object
  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime: reportedCases * 51200,
    severeCasesByRequestedTime: reportedCases * 7680,
    get hospitalBedsByRequestedTime() {
      return totalHospitalBeds * 35 - this.severeCasesByRequestedTime;
    },
    get casesForICUByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.05);
    },
    get casesForVentilatorsByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.02);
    },
    get dollarsInFlight() {
      return Math.trunc(
        this.infectionsByRequestedTime * 0.65 * avgDailyIncomePopulation * 30
      );
    }
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
