const spentPerSource = (tripId) => `
  select
    sr.name source,
    sum(ex.price) amount
  from expenses ex
  inner join sources sr on ex.source_id = sr.id
  where trip_id=${tripId}
  group by sr.name
  order by 2 desc;
`

const spentPerCategory = (tripId) => `
  select
    ct.name category,
    sum(ex.price) amount
  from expenses ex
  inner join categories ct on ex.category_id = ct.id
  where trip_id=${tripId}
  group by ct.name
  order by 2 desc;
`

const spentPerDay = (tripId) => `
  select
    date as "day",
    sum(price) amount
  from expenses
  where trip_id=${tripId}
  group by date
  order by 1 asc;
`

const remainingDays = (tripId) => `
  select
    days_till_end(ts.start_date, ts.end_date) remaining_days
  from trips ts
  where ts.id=${tripId};
`

const remainingAmountPerSource = (tripId) => `
  select
    sr.name source,
    bg.amount amount,
    bg.amount -
    (select sum(ex.price) from expenses ex
      where ex.trip_id=bg.trip_id and ex.source_id=bg.source_id) remaining_per_source
  from budgets bg
  inner join sources sr on bg.source_id=sr.id
  where bg.trip_id=${tripId};
`

const remainingAmountPerDay = (tripId) => `
  select
    (select sum(bg.amount) from budgets bg where bg.trip_id=ts.id)
    -
    (select sum(ex.price) from expenses ex where ex.trip_id=ts.id)
    /
    greatest(1, days_till_end(ts.start_date, ts.end_date))
    as remaining_per_day
  from trips ts
  where ts.id=${tripId};
`

module.exports = {
  spentPerSource,
  spentPerCategory,
  spentPerDay,
  remainingDays,
  remainingAmountPerSource,
  remainingAmountPerDay
}
