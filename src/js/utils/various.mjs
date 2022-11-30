// export function createSubmitObject(input, object) {
//   if (input.type === "text") {
//     createOrDeleteKeys(input, object);
//   } else if (input.type === "date") {
//     const date = new Date(input.value).toString();
//     object.endsAt = date;
//   } else if (input.type === "textarea") {
//     createOrDeleteKeys(input, object);
//   } else if (input.type === "select-one") {
//     createOrDeleteKeys(input, object);
//   }
// }

// sort by most bids
export function sortByMostBids(data) {
  return data.sort((a, b) => {
    if (a.bids.length < b.bids.length) {
      return 1;
    } else {
      return -1;
    }
  });
}
// sort by highest integer
export function sortByHighestInteger(data) {
  return data.sort((a, b) => {
    if (a.highestBid < b.highestBid) {
      return 1;
    } else {
      return -1;
    }
  });
}
// sort by highest integer
export function sortByLowestInteger(data) {
  return data.sort((a, b) => {
    if (a.highestBid > b.highestBid) {
      return 1;
    } else {
      return -1;
    }
  });
}

// get listing still for sale
export function getListingsStillForSale(data) {
  return data.filter((listing) => {
    if (listing.bids.length > 0) {
      const timeLeft = returnsTimeLeftInt(listing);
      if (timeLeft > 0) {
        return listing;
      }
    }
  });
}

// returns a countdown object
export function calculateTime(timeLeft) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

export function returnsTimeLeftInt(listing) {
  const { endsAt } = listing;
  const now = new Date().getTime();
  const countDownDate = new Date(endsAt).getTime();
  return countDownDate - now;
}

export function filterHighestBid(listings) {
  const highestBid = listings.bids.reduce((accumulator, currentValue) => {
    accumulator.push(currentValue.amount);
    return accumulator;
  }, []);
  return Math.max(...highestBid);
}

// modify listings still fro sale (give it a countdown object)
export function addCountdownObject(data) {
  return data.map((listing) => {
    const timeLeft = returnsTimeLeftInt(listing);
    const countDownObject = calculateTime(timeLeft);
    return {
      ...listing,
      countDownObject,
    };
  });
  // const { days, hours, minutes, seconds } = countDownObject;
  // const countDownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// export function addHighestBidObject(data) {
//   return data.map((listing) => {
//     const timeLeft = returnsTimeLeftInt(listing);
//     const countDownObject = calculateTime(timeLeft);
//     return {
//       ...listing,
//       countDownObject,
//     };
//   });
// }
