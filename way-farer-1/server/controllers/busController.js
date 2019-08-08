import BusModel from '../model/busModel';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';

const busModel = new BusModel('bus');

/**
* @fileOverview - class manages all bus logic
* @class - BusController
* @requires - ../model/busModel
* @requires - ../helpers/errorStrings
* @requires - ../helpers/responseHelper
* @exports - BusController
* */

class BusController {
  /**
 * Create a bus (for admin only)
 * @param {object} req
 * @param {object} res
 */

  static async createBus(req, res) {
    try {
      const number_plate = req.body.number_plate.toUpperCase();
      const busExists = await busModel.checkBusExists('number_plate', number_plate);
      if (busExists) {
        return ResponseHelper.error(res, 409, `Bus with number plate ${number_plate} has already been added`);
      }
      const newBus = await busModel.createBusQuery(req.body);
      if (!newBus) {
        throw new Error(errorStrings.serverError);
      }
      return ResponseHelper.success(res, 201, newBus);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
     * Get buses (for users and admin)
     * @param {object} req
     * @param {object} res
     * @returns {object} return all buses
     */

  static async getBuses(req, res) {
    try {
      const buses = await busModel.getBusesQuery();

      return ResponseHelper.success(res, 200, buses);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }
}

export default BusController;
