import TripPointView from '../view/trip-point.js';
import EventEditFormView from '../view/event-edit-form.js';
import {render, RenderPosition,replace} from '../util/render.js';

export default class Point  {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._handleCloseEditClick = this._handleCloseEditClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new TripPointView(point);
    this._eventEditFormComponent = new EventEditFormView(point);

    this._pointComponent.setClickHandler(this._handleEditClick);
    this._eventEditFormComponent.setFormSubmitHandler(this._handleSubmitForm);
    this._eventEditFormComponent.setCloseClickHandler(this._handleCloseEditClick);

    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToEditForm() {
    replace(this._eventEditFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceEditFormToPoint() {
    replace(this._pointComponent, this._eventEditFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this._replaceEditFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToEditForm();
  }

  _handleSubmitForm() {
    this._replaceEditFormToPoint();
  }

  _handleCloseEditClick() {
    this._replaceEditFormToPoint();
  }
}
