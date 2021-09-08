import TripPointView from '../view/trip-point.js';
import EventEditFormView from '../view/event-edit-form.js';
import {render, RenderPosition,replace, remove} from '../util/render.js';

export default class Point  {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._eventEditFormComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._handleCloseEditClick = this._handleCloseEditClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEventEditFormComponent = this._eventEditFormComponent;

    this._pointComponent = new TripPointView(point);
    this._eventEditFormComponent = new EventEditFormView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditFormComponent.setFormSubmitHandler(this._handleSubmitForm);
    this._eventEditFormComponent.setCloseClickHandler(this._handleCloseEditClick);

    if (prevPointComponent === null || prevEventEditFormComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointListContainer.getElement().contains(prevEventEditFormComponent.getElement())) {
      replace(this._eventEditFormComponent, prevEventEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEventEditFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._eventEditFormComponent);
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
