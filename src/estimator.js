const covid19ImpactEstimator = (data) => {
  if (data.periodType === 'weeks') {
    data.timeToElapse *= 7;
  } else if (data.periodType === 'months') {
    data.timeToElapse *= 30;
  }

  const { reportedCases, totalHospitalBeds, timeToElapse } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  // Impact object
  const impact = {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime:
      reportedCases * 10 * 2 ** Math.trunc(timeToElapse / 3),
    get severeCasesByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.15);
    },
    get hospitalBedsByRequestedTime() {
      return Math.trunc(
        totalHospitalBeds * 0.35 - this.severeCasesByRequestedTime
      );
    },
    get casesForICUByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.05);
    },
    get casesForVentilatorsByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.02);
    },
    get dollarsInFlight() {
      const dollarLost = this.infectionsByRequestedTime * avgDailyIncomePopulation;
      return Math.trunc((dollarLost * avgDailyIncomeInUSD) / timeToElapse);
    }
  };

  // Severe Impact Object
  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime:
      reportedCases * 50 * 2 ** Math.trunc(timeToElapse / 3),
    get severeCasesByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.15);
    },
    get hospitalBedsByRequestedTime() {
      return Math.trunc(
        totalHospitalBeds * 0.35 - this.severeCasesByRequestedTime
      );
    },
    get casesForICUByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.05);
    },
    get casesForVentilatorsByRequestedTime() {
      return Math.trunc(this.infectionsByRequestedTime * 0.02);
    },
    get dollarsInFlight() {
      const dollarLost = this.infectionsByRequestedTime * avgDailyIncomePopulation;

      return Math.trunc((dollarLost * avgDailyIncomeInUSD) / timeToElapse);
    }
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
