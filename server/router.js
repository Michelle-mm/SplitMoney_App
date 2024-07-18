const express = require('express');
const router = express.Router();
const schemas = require('./schemas');

router.post('/splits', async (req, res) => {
    const {description, totalcost, paidBy, splitType, participants} = req.body;
    const split_Data = {description:description, totalcost:totalcost, paidBy:paidBy, splitType:splitType, participants:participants}
    const newSplit = new schemas.Split(split_Data);
  
    await newSplit.save()
      .then(() => res.send('Data saved successfully'))
      .catch(err => res.status(500).send('Error saving data: ' + err));
});


router.get('/splits', async (req, res) => {
    try {
      const splitsData = await schemas.Split.find({}).exec();
    //   res.json(splits);
    res.send(JSON.stringify(splitsData));
    } catch (err) {
      res.status(500).send('Error fetching data: ' + err);
    }
  });

router.delete('/delete-split/:id', async (req, res) => {
  try {
      const id = req.params.id;
      await schemas.Split.findByIdAndDelete(id);
      res.send('Data deleted successfully');
  } catch (err) {
      res.status(500).send('Error deleting data: ' + err);
  }
});
//Friends
router.post('/friends', async (req, res) => {
    const {name, iconKey} = req.body;
    // console.log("name, iconkey:", name, iconKey);
    const friend_Data = {name:name, iconKey:iconKey}
    const newFriend = new schemas.Friend(friend_Data);
  
    await newFriend.save()
      .then(() => res.send('Friends Data saved successfully'))
      .catch(err => res.status(500).send('Error saving data: ' + err));
});


router.get('/friends', async (req, res) => {
    try {
      const friendsData = await schemas.Friend.find({}).exec();
      // res.json(friendsData);
    res.send(JSON.stringify(friendsData));
    } catch (err) {
      res.status(500).send('Error fetching data: ' + err);
    }
  });

router.delete('/delete-friend/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await schemas.Friend.findByIdAndDelete(id);
        res.send('Data deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting data: ' + err);
    }
});

module.exports = router;
